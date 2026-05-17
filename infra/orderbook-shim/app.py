"""Swarm & Bee · Order Book Shim · FastAPI + SQLite

Runs on the Synology DS1525+ NAS (192.168.0.102) inside Container Manager.
Exposed via Cloudflare Tunnel at https://orderbook.swarmandbee.ai.

This is the source of truth for the order ledger. CF Pages Functions call
this shim over HTTPS. No data leaves owned hardware.

Auth: X-Orderbook-Key header must match env ORDERBOOK_API_KEY.
DB:   SQLite at /data/orders.db (mapped from /volume1/swarm/orderbook/ on host).
"""
from __future__ import annotations

import hashlib
import json
import os
import random
import sqlite3
import string
import time
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

import secrets as _secrets
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel, EmailStr, Field

# ─── config ─────────────────────────────────────────────────────────────────

DB_PATH = Path(os.environ.get("ORDERBOOK_DB_PATH", "/data/orders.db"))
MIGRATIONS_DIR = Path(os.environ.get("ORDERBOOK_MIGRATIONS_DIR", "/app/migrations"))
API_KEY = os.environ.get("ORDERBOOK_API_KEY", "")
ADMIN_USER = os.environ.get("ORDERBOOK_ADMIN_USER", "dmack")
ADMIN_PASSWORD = os.environ.get("ORDERBOOK_ADMIN_PASSWORD", "")
VERSION = "0.2.0"


# ─── db ─────────────────────────────────────────────────────────────────────

def init_db() -> None:
    """Apply all migrations on startup. Idempotent (uses IF NOT EXISTS)."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("PRAGMA journal_mode = WAL")
        conn.execute("PRAGMA foreign_keys = ON")
        for mig in sorted(MIGRATIONS_DIR.glob("*.sql")):
            sql = mig.read_text()
            conn.executescript(sql)
        conn.commit()


@contextmanager
def db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


# ─── helpers ────────────────────────────────────────────────────────────────

def mint_order_id() -> str:
    d = datetime.now(timezone.utc)
    stamp = d.strftime("%Y%m%d")
    rnd = "".join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"BAK-{stamp}-{rnd}"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def require_key(x_orderbook_key: Optional[str]) -> None:
    if not API_KEY:
        raise HTTPException(status_code=500, detail="ORDERBOOK_API_KEY not configured on shim")
    if not x_orderbook_key or not _secrets.compare_digest(x_orderbook_key, API_KEY):
        raise HTTPException(status_code=401, detail="invalid X-Orderbook-Key")


# ─── admin basic auth (dashboard) ──────────────────────────────────────────

_security = HTTPBasic(realm="Swarm & Bee Orderbook · admin")

# CSRF defense: any POST/PUT/DELETE to /admin/* must originate from one of these.
# Browser Basic Auth credentials get auto-replayed on cross-origin requests;
# without an Origin/Referer check, a malicious site could trigger admin state changes.
_ALLOWED_ADMIN_ORIGINS = {
    "https://orderbook.swarmandbee.ai",
    "http://localhost:18489",        # LAN dev
    "http://127.0.0.1:18489",
    "http://192.168.0.102:18489",    # NAS LAN direct
}


def require_admin(credentials: HTTPBasicCredentials = Depends(_security)) -> str:
    """Constant-time compare. 401 on miss. Used for /dashboard and /admin/*."""
    if not ADMIN_PASSWORD:
        raise HTTPException(status_code=500, detail="ORDERBOOK_ADMIN_PASSWORD not set")
    user_ok = _secrets.compare_digest(credentials.username, ADMIN_USER)
    pass_ok = _secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (user_ok and pass_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid credentials",
            headers={"WWW-Authenticate": 'Basic realm="Swarm & Bee Orderbook · admin"'},
        )
    return credentials.username


def require_admin_origin(request: Request) -> None:
    """CSRF defense for mutating admin endpoints. Reject if Origin/Referer
    doesn't match an allowed origin. GET endpoints are exempt (no state change)."""
    origin = request.headers.get("Origin") or ""
    referer = request.headers.get("Referer") or ""
    # Allow if Origin matches OR Referer starts with an allowed origin
    if origin in _ALLOWED_ADMIN_ORIGINS:
        return
    for allowed in _ALLOWED_ADMIN_ORIGINS:
        if referer.startswith(allowed + "/") or referer == allowed:
            return
    raise HTTPException(
        status_code=403,
        detail=f"admin mutation requires Origin/Referer from {sorted(_ALLOWED_ADMIN_ORIGINS)}",
    )


def row_to_dict(row: sqlite3.Row) -> dict[str, Any]:
    return {k: row[k] for k in row.keys()}


# ─── models ─────────────────────────────────────────────────────────────────

class OrderCreate(BaseModel):
    channel: str = Field(..., pattern="^(cli|web-box|web-bounty)$")
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=200)
    company: Optional[str] = Field(default=None, max_length=200)
    sku: Optional[str] = Field(default=None, max_length=40)
    sku_id: Optional[str] = Field(default=None, max_length=80)
    domain: Optional[str] = Field(default=None, max_length=80)
    pairs_requested: Optional[int] = None
    failure_mode: Optional[str] = Field(default=None, max_length=500)
    notes: Optional[str] = Field(default=None, max_length=6000)
    budget: Optional[str] = Field(default=None, max_length=120)
    deadline: Optional[str] = Field(default=None, max_length=120)
    settlement_rail: Optional[str] = Field(default="either", pattern="^(stripe|swarmusdc|either)$")
    picks_json: Optional[str] = None
    bundle_hash: Optional[str] = Field(default=None, pattern="^[0-9a-f]{64}$")
    payload_sha256: str = Field(..., pattern="^[0-9a-f]{64}$")
    user_agent: Optional[str] = Field(default=None, max_length=500)


class OrderLookup(BaseModel):
    order_id: str = Field(..., pattern=r"^BAK-\d{8}-[A-Z0-9]{4}$")
    email: EmailStr


class OrdersListReq(BaseModel):
    email: EmailStr
    limit: int = Field(default=50, ge=1, le=200)


class EventCreate(BaseModel):
    order_id: str
    event_type: str = Field(..., max_length=40)
    from_status: Optional[str] = None
    to_status: Optional[str] = None
    actor: str = Field(..., max_length=120)
    detail: Optional[str] = Field(default=None, max_length=2000)


class ReceiptCreate(BaseModel):
    order_id: str
    receipt_type: str = Field(..., max_length=40)
    email_to: EmailStr
    email_subject: Optional[str] = None
    email_provider: Optional[str] = None
    email_provider_id: Optional[str] = None
    delivered: Optional[bool] = None
    error: Optional[str] = None


class StatusUpdate(BaseModel):
    order_id: str
    to_status: str = Field(..., pattern="^(pending|invoiced|paid|assembled|shipped|cancelled)$")
    actor: str = "human"
    detail: Optional[str] = None
    invoice_url: Optional[str] = None
    invoice_amount_usd: Optional[float] = None
    payment_tx_ref: Optional[str] = None
    bundle_sha256: Optional[str] = None
    download_url: Optional[str] = None
    download_expires_at: Optional[str] = None
    hedera_anchor_tx: Optional[str] = None


# ─── app ────────────────────────────────────────────────────────────────────

app = FastAPI(title="Swarm & Bee · Order Book Shim", version=VERSION)


@app.on_event("startup")
def _startup() -> None:
    init_db()


@app.get("/healthz")
def healthz() -> dict[str, Any]:
    """Public — no auth. Quick liveness + DB reachability check.
    Does NOT leak exception details to unauthenticated callers (paths, SQLite errors, etc).
    Operator: tail container logs for the real error if /healthz returns 503.
    """
    try:
        with db() as conn:
            row = conn.execute("SELECT COUNT(*) AS n FROM orders").fetchone()
            n_orders = row["n"]
        return {"ok": True, "version": VERSION, "n_orders": n_orders, "ts": now_iso()}
    except Exception as e:
        # Log server-side; return generic error to caller.
        import sys
        print(f"[healthz] db error: {e}", file=sys.stderr, flush=True)
        return JSONResponse({"ok": False, "error": "db_unavailable"}, status_code=503)


@app.post("/orders")
def create_order(req: OrderCreate, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    require_key(x_orderbook_key)
    order_id = mint_order_id()
    with db() as conn:
        conn.execute(
            """INSERT INTO orders
               (order_id, email, name, company, channel, sku, sku_id, domain,
                pairs_requested, failure_mode, notes, budget, deadline,
                settlement_rail, picks_json, bundle_hash, payload_sha256, user_agent)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (
                order_id, req.email.lower(), req.name, req.company, req.channel,
                req.sku, req.sku_id, req.domain, req.pairs_requested,
                req.failure_mode, req.notes, req.budget, req.deadline,
                req.settlement_rail, req.picks_json, req.bundle_hash,
                req.payload_sha256, req.user_agent,
            ),
        )
        conn.execute(
            """INSERT INTO order_events (order_id, event_type, to_status, actor, detail)
               VALUES (?, 'created', 'pending', ?, ?)""",
            (order_id, req.channel, f"intake via {req.channel}"),
        )
    return {"ok": True, "order_id": order_id, "status": "pending", "created_at": now_iso()}


@app.post("/orders/lookup")
def lookup_order(req: OrderLookup, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    require_key(x_orderbook_key)
    with db() as conn:
        row = conn.execute(
            "SELECT * FROM orders WHERE order_id = ? AND email = ?",
            (req.order_id.upper(), req.email.lower()),
        ).fetchone()
        if not row:
            # Same response for not-found and wrong-email — anti-enumeration
            raise HTTPException(status_code=404, detail="order not found (or email does not match)")
        events = conn.execute(
            """SELECT event_type, from_status, to_status, actor, detail, created_at
               FROM order_events WHERE order_id = ? ORDER BY created_at ASC""",
            (req.order_id.upper(),),
        ).fetchall()
    return {"ok": True, "order": row_to_dict(row), "events": [row_to_dict(e) for e in events]}


@app.post("/orders/list")
def list_orders(req: OrdersListReq, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    require_key(x_orderbook_key)
    with db() as conn:
        rows = conn.execute(
            """SELECT order_id, created_at, status, channel, sku, sku_id, domain,
                      pairs_requested, settlement_rail
               FROM orders WHERE email = ? ORDER BY created_at DESC LIMIT ?""",
            (req.email.lower(), req.limit),
        ).fetchall()
    brief = [row_to_dict(r) for r in rows]
    return {"ok": True, "email": req.email.lower(), "count": len(brief), "orders": brief}


@app.post("/events")
def log_event(req: EventCreate, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    require_key(x_orderbook_key)
    with db() as conn:
        cur = conn.execute(
            """INSERT INTO order_events (order_id, event_type, from_status, to_status, actor, detail)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (req.order_id, req.event_type, req.from_status, req.to_status, req.actor, req.detail),
        )
        event_id = cur.lastrowid
    return {"ok": True, "event_id": event_id}


@app.post("/receipts")
def log_receipt(req: ReceiptCreate, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    require_key(x_orderbook_key)
    with db() as conn:
        cur = conn.execute(
            """INSERT INTO receipts
               (order_id, receipt_type, email_to, email_subject, email_provider, email_provider_id, delivered, error)
               VALUES (?,?,?,?,?,?,?,?)""",
            (
                req.order_id, req.receipt_type, req.email_to.lower(),
                req.email_subject, req.email_provider, req.email_provider_id,
                None if req.delivered is None else int(req.delivered),
                req.error,
            ),
        )
        receipt_id = cur.lastrowid
    return {"ok": True, "receipt_id": receipt_id}


@app.post("/orders/status")
def update_status(req: StatusUpdate, x_orderbook_key: Optional[str] = Header(default=None)) -> dict[str, Any]:
    """Admin status transition. Sets status + ancillary fields, logs an event."""
    require_key(x_orderbook_key)
    ts = now_iso()
    with db() as conn:
        cur_row = conn.execute("SELECT status FROM orders WHERE order_id = ?", (req.order_id,)).fetchone()
        if not cur_row:
            raise HTTPException(status_code=404, detail="order not found")
        from_status = cur_row["status"]

        # Build update dynamically (only set non-None fields)
        sets = ["status = ?", "status_updated_at = ?"]
        vals: list[Any] = [req.to_status, ts]
        for col, val in [
            ("invoice_url", req.invoice_url),
            ("invoice_amount_usd", req.invoice_amount_usd),
            ("payment_tx_ref", req.payment_tx_ref),
            ("bundle_sha256", req.bundle_sha256),
            ("download_url", req.download_url),
            ("download_expires_at", req.download_expires_at),
            ("hedera_anchor_tx", req.hedera_anchor_tx),
        ]:
            if val is not None:
                sets.append(f"{col} = ?")
                vals.append(val)
        # Auto-stamp paid_at / assembled_at / shipped_at on transition
        if req.to_status == "paid":
            sets.append("paid_at = ?")
            vals.append(ts)
        elif req.to_status == "assembled":
            sets.append("assembled_at = ?")
            vals.append(ts)
        elif req.to_status == "shipped":
            sets.append("shipped_at = ?")
            vals.append(ts)

        vals.append(req.order_id)
        conn.execute(f"UPDATE orders SET {', '.join(sets)} WHERE order_id = ?", vals)
        conn.execute(
            """INSERT INTO order_events (order_id, event_type, from_status, to_status, actor, detail)
               VALUES (?, 'status_change', ?, ?, ?, ?)""",
            (req.order_id, from_status, req.to_status, req.actor, req.detail),
        )
    return {"ok": True, "order_id": req.order_id, "from": from_status, "to": req.to_status}


# ─── admin endpoints (Basic Auth) ──────────────────────────────────────────


@app.get("/admin/orders")
def admin_list_all(
    _admin: str = Depends(require_admin),
    status: Optional[str] = None,
    q: Optional[str] = None,
    limit: int = 100,
    offset: int = 0,
) -> dict[str, Any]:
    """List ALL orders (admin only). Optional status filter + search."""
    where = []
    params: list[Any] = []
    if status:
        where.append("status = ?")
        params.append(status)
    if q:
        # Cap search length to prevent DoS via huge wildcard scans on growing tables
        q = q[:100]
        where.append("(order_id LIKE ? OR email LIKE ? OR name LIKE ? OR sku_id LIKE ?)")
        like = f"%{q}%"
        params += [like, like, like, like]
    where_sql = ("WHERE " + " AND ".join(where)) if where else ""
    params += [limit, offset]
    with db() as conn:
        rows = conn.execute(
            f"""SELECT order_id, created_at, status, status_updated_at, channel,
                       sku, sku_id, domain, pairs_requested, settlement_rail,
                       email, name, company, invoice_amount_usd, paid_at
                FROM orders {where_sql}
                ORDER BY created_at DESC LIMIT ? OFFSET ?""",
            params,
        ).fetchall()
        total = conn.execute(
            f"SELECT COUNT(*) AS n FROM orders {where_sql}",
            params[:-2] if where else [],
        ).fetchone()["n"]
    return {
        "ok": True,
        "total": total,
        "count": len(rows),
        "limit": limit,
        "offset": offset,
        "orders": [row_to_dict(r) for r in rows],
    }


@app.get("/admin/order/{order_id}")
def admin_get_one(order_id: str, _admin: str = Depends(require_admin)) -> dict[str, Any]:
    """Full order detail + event log (admin — no email-match required)."""
    with db() as conn:
        row = conn.execute("SELECT * FROM orders WHERE order_id = ?", (order_id.upper(),)).fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="order not found")
        events = conn.execute(
            """SELECT event_type, from_status, to_status, actor, detail, created_at
               FROM order_events WHERE order_id = ? ORDER BY created_at ASC""",
            (order_id.upper(),),
        ).fetchall()
        receipts = conn.execute(
            """SELECT receipt_type, email_to, email_provider, email_provider_id, sent_at, delivered, error
               FROM receipts WHERE order_id = ? ORDER BY sent_at ASC""",
            (order_id.upper(),),
        ).fetchall()
    return {
        "ok": True,
        "order": row_to_dict(row),
        "events": [row_to_dict(e) for e in events],
        "receipts": [row_to_dict(r) for r in receipts],
    }


@app.post("/admin/order/{order_id}/status")
def admin_flip_status(
    order_id: str,
    req: StatusUpdate,
    request: Request,
    _admin: str = Depends(require_admin),
) -> dict[str, Any]:
    """Admin status flip from the dashboard. Same logic as /orders/status.
    Requires Origin/Referer match (CSRF defense) so a malicious cross-origin page
    can't replay the admin's browser-cached Basic Auth to trigger state changes."""
    require_admin_origin(request)
    req.order_id = order_id.upper()
    return update_status(req, x_orderbook_key=API_KEY)  # bypass key check via internal call


@app.get("/admin/stats")
def admin_stats(_admin: str = Depends(require_admin)) -> dict[str, Any]:
    """Status counts + today's intake — for the dashboard cards."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    with db() as conn:
        by_status = {
            r["status"]: r["n"]
            for r in conn.execute(
                "SELECT status, COUNT(*) AS n FROM orders GROUP BY status"
            ).fetchall()
        }
        total = sum(by_status.values())
        today_count = conn.execute(
            "SELECT COUNT(*) AS n FROM orders WHERE date(created_at) = ?", (today,)
        ).fetchone()["n"]
        unpaid_value = conn.execute(
            "SELECT COALESCE(SUM(invoice_amount_usd), 0) AS v FROM orders WHERE status = 'invoiced'"
        ).fetchone()["v"]
        paid_value = conn.execute(
            "SELECT COALESCE(SUM(invoice_amount_usd), 0) AS v FROM orders WHERE status IN ('paid','assembled','shipped')"
        ).fetchone()["v"]
    return {
        "ok": True,
        "total": total,
        "today": today_count,
        "by_status": by_status,
        "unpaid_invoiced_usd": float(unpaid_value or 0),
        "paid_usd": float(paid_value or 0),
        "ts": now_iso(),
    }


# ─── dashboard HTML (served at /) ──────────────────────────────────────────


@app.get("/", response_class=HTMLResponse)
def dashboard(_admin: str = Depends(require_admin)) -> str:
    return DASHBOARD_HTML


DASHBOARD_HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Swarm & Bee · Orderbook</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0;
    font: 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: #0a0a0a; color: #e5e5e5;
    min-height: 100vh;
  }
  header {
    border-bottom: 1px solid #262626;
    background: rgba(10,10,10,0.95); backdrop-filter: blur(8px);
    padding: 14px 24px; display: flex; align-items: center; gap: 16px;
    position: sticky; top: 0; z-index: 10;
  }
  .brand { font-weight: 700; color: #fbbf24; letter-spacing: 0.5px; }
  .brand small { color: #737373; font-weight: 400; margin-left: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; }
  .live { margin-left: auto; font-size: 11px; color: #84cc16; font-family: monospace; }
  .live::before { content: "● "; animation: pulse 2s infinite; }
  @keyframes pulse { 50% { opacity: 0.4; } }
  main { padding: 24px; max-width: 1400px; margin: 0 auto; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .stat { background: #171717; border: 1px solid #262626; border-radius: 8px; padding: 16px; }
  .stat-label { font-size: 10px; color: #737373; text-transform: uppercase; letter-spacing: 2px; font-family: monospace; margin-bottom: 6px; }
  .stat-value { font-size: 26px; font-weight: 700; color: #fafafa; font-family: monospace; }
  .stat-value.amber { color: #fbbf24; }
  .stat-value.rose { color: #f43f5e; }
  .stat-value.green { color: #84cc16; }
  .controls { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
  input, select, button {
    background: #171717; color: #e5e5e5; border: 1px solid #262626;
    border-radius: 6px; padding: 8px 12px; font: inherit; font-size: 13px;
  }
  input:focus, select:focus { outline: none; border-color: #fbbf24; }
  button { cursor: pointer; transition: all 0.15s; }
  button:hover { border-color: #fbbf24; }
  button.primary { background: #fbbf24; color: #0a0a0a; font-weight: 600; border-color: #fbbf24; }
  button.primary:hover { background: #fde047; }
  table { width: 100%; border-collapse: collapse; background: #171717; border: 1px solid #262626; border-radius: 8px; overflow: hidden; }
  th { text-align: left; padding: 10px 14px; background: #0a0a0a; color: #737373; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-family: monospace; border-bottom: 1px solid #262626; }
  td { padding: 12px 14px; border-bottom: 1px solid #1f1f1f; font-size: 13px; }
  tr { transition: background 0.1s; cursor: pointer; }
  tr:hover td { background: #1f1f1f; }
  tr.new-flash td { animation: flash 1.5s ease-out; }
  @keyframes flash { 0% { background: rgba(132,204,22,0.25); } 100% { background: transparent; } }
  .order-id { font-family: monospace; color: #fbbf24; font-weight: 600; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-family: monospace; font-weight: 600; text-transform: uppercase; }
  .badge.pending   { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.4); }
  .badge.invoiced  { background: rgba(99,102,241,0.15); color: #818cf8; border: 1px solid rgba(99,102,241,0.4); }
  .badge.paid      { background: rgba(132,204,22,0.15); color: #84cc16; border: 1px solid rgba(132,204,22,0.4); }
  .badge.assembled { background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.4); }
  .badge.shipped   { background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.4); }
  .badge.cancelled { background: rgba(115,115,115,0.15); color: #737373; border: 1px solid rgba(115,115,115,0.4); }
  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
  .modal-bg.show { display: flex; }
  .modal { background: #171717; border: 1px solid #fbbf24; border-radius: 10px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .modal header { border-bottom: 1px solid #262626; padding: 16px 24px; }
  .modal h2 { margin: 0; font-size: 18px; color: #fbbf24; font-family: monospace; }
  .modal-body { padding: 24px; }
  .modal-section { margin-bottom: 20px; }
  .modal-section h3 { font-size: 10px; color: #737373; text-transform: uppercase; letter-spacing: 2px; font-family: monospace; margin: 0 0 8px; }
  .modal-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 6px 16px; font-size: 13px; }
  .modal-grid dt { color: #737373; }
  .modal-grid dd { margin: 0; font-family: monospace; color: #fafafa; word-break: break-all; }
  .event-row { padding: 10px; border-left: 2px solid #262626; margin-bottom: 6px; font-size: 12px; }
  .event-row time { color: #737373; font-family: monospace; }
  .event-row .type { color: #fbbf24; font-family: monospace; margin-left: 8px; }
  .event-row .detail { color: #a3a3a3; margin-top: 4px; }
  .flips { display: flex; gap: 6px; flex-wrap: wrap; }
  .flips button { font-size: 12px; }
  #toast { position: fixed; top: 70px; right: 24px; background: #171717; border: 1px solid #84cc16; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #84cc16; z-index: 200; display: none; }
  #toast.show { display: block; animation: slidein 0.3s; }
  @keyframes slidein { from { transform: translateX(20px); opacity: 0; } }
  #toast.err { border-color: #f43f5e; color: #f43f5e; }
  .empty { text-align: center; padding: 60px 20px; color: #737373; font-family: monospace; font-size: 13px; }
  @media (max-width: 720px) { .modal-grid { grid-template-columns: 1fr; } th, td { padding: 8px; } }
</style>
</head>
<body>
<header>
  <div class="brand">SWARM &amp; BEE<small>orderbook · sovereign ledger</small></div>
  <div class="live" id="liveStatus">polling 5s</div>
</header>
<main>
  <section class="stats" id="statsRow">
    <div class="stat"><div class="stat-label">Today</div><div class="stat-value amber" id="stToday">—</div></div>
    <div class="stat"><div class="stat-label">Total orders</div><div class="stat-value" id="stTotal">—</div></div>
    <div class="stat"><div class="stat-label">Pending</div><div class="stat-value rose" id="stPending">—</div></div>
    <div class="stat"><div class="stat-label">Invoiced</div><div class="stat-value" id="stInvoiced">—</div></div>
    <div class="stat"><div class="stat-label">Paid</div><div class="stat-value green" id="stPaid">—</div></div>
    <div class="stat"><div class="stat-label">Unpaid $</div><div class="stat-value amber" id="stUnpaid">—</div></div>
    <div class="stat"><div class="stat-label">Paid $</div><div class="stat-value green" id="stPaidUsd">—</div></div>
  </section>
  <div class="controls">
    <input id="qInput" placeholder="search · order id · email · sku" style="flex:1 1 280px;">
    <select id="statusFilter">
      <option value="">all statuses</option>
      <option>pending</option><option>invoiced</option><option>paid</option>
      <option>assembled</option><option>shipped</option><option>cancelled</option>
    </select>
    <button onclick="loadAll()">refresh now</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Order ID</th><th>Created</th><th>Status</th><th>Email</th>
        <th>Channel</th><th>SKU</th><th>Domain</th><th>Settlement</th><th>$</th>
      </tr>
    </thead>
    <tbody id="orderRows"><tr><td colspan="9" class="empty">loading…</td></tr></tbody>
  </table>
</main>

<div class="modal-bg" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <header><h2 id="mTitle">—</h2></header>
    <div class="modal-body" id="mBody">…</div>
  </div>
</div>
<div id="toast"></div>

<script>
const POLL_MS = 5000;
const seen = new Set();
let firstLoad = true;

const $ = id => document.getElementById(id);

function toast(msg, err=false) {
  const t = $('toast'); t.textContent = msg; t.className = err ? 'show err' : 'show';
  setTimeout(() => t.className = '', 3000);
}

async function api(path, opts={}) {
  // Browser auto-attaches Basic Auth credentials (browser remembered them).
  const r = await fetch(path, { credentials: 'same-origin', ...opts });
  if (r.status === 401) { location.reload(); return null; }
  const text = await r.text();
  try { return JSON.parse(text); } catch { throw new Error(text); }
}

async function loadStats() {
  const s = await api('/admin/stats');
  if (!s || !s.ok) return;
  $('stToday').textContent = s.today;
  $('stTotal').textContent = s.total;
  $('stPending').textContent = s.by_status.pending || 0;
  $('stInvoiced').textContent = s.by_status.invoiced || 0;
  $('stPaid').textContent = (s.by_status.paid || 0) + (s.by_status.assembled || 0) + (s.by_status.shipped || 0);
  $('stUnpaid').textContent = '$' + s.unpaid_invoiced_usd.toFixed(0);
  $('stPaidUsd').textContent = '$' + s.paid_usd.toFixed(0);
}

async function loadOrders() {
  const q = $('qInput').value.trim();
  const status = $('statusFilter').value;
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (status) params.set('status', status);
  params.set('limit', '100');
  const r = await api('/admin/orders?' + params);
  if (!r || !r.ok) return;
  const tbody = $('orderRows');
  if (r.orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" class="empty">no orders match the filter</td></tr>';
    return;
  }
  tbody.innerHTML = r.orders.map(o => {
    const isNew = !firstLoad && !seen.has(o.order_id);
    seen.add(o.order_id);
    return `<tr class="${isNew?'new-flash':''}" onclick="openOrder('${o.order_id}')">
      <td class="order-id">${o.order_id}</td>
      <td>${(o.created_at||'').slice(0,16)}</td>
      <td><span class="badge ${o.status}">${o.status}</span></td>
      <td>${esc(o.email)}</td>
      <td>${esc(o.channel||'')}</td>
      <td>${esc(o.sku||'—')}</td>
      <td>${esc(o.domain||'—')}</td>
      <td>${esc(o.settlement_rail||'—')}</td>
      <td>${o.invoice_amount_usd ? '$'+Number(o.invoice_amount_usd).toFixed(0) : '—'}</td>
    </tr>`;
  }).join('');
  firstLoad = false;
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function openOrder(id) {
  const d = await api('/admin/order/' + id);
  if (!d || !d.ok) { toast('lookup failed', true); return; }
  const o = d.order;
  $('mTitle').textContent = o.order_id + '  ·  ' + o.status;
  const fld = (k, v) => v == null || v === '' ? '' : `<dt>${k}</dt><dd>${esc(v)}</dd>`;
  const flipBtn = (next, label) => o.status === next ? '' :
    `<button onclick="flipStatus('${o.order_id}','${next}')">${label}</button>`;
  $('mBody').innerHTML = `
    <div class="modal-section">
      <h3>▍ Order</h3>
      <dl class="modal-grid">
        ${fld('created_at', o.created_at)}
        ${fld('status', o.status)}
        ${fld('email', o.email)}
        ${fld('name', o.name)}
        ${fld('company', o.company)}
        ${fld('channel', o.channel)}
        ${fld('sku', o.sku)}
        ${fld('sku_id', o.sku_id)}
        ${fld('domain', o.domain)}
        ${fld('pairs_requested', o.pairs_requested)}
        ${fld('failure_mode', o.failure_mode)}
        ${fld('settlement_rail', o.settlement_rail)}
        ${fld('notes', o.notes)}
      </dl>
    </div>
    <div class="modal-section">
      <h3>▍ Payment</h3>
      <dl class="modal-grid">
        ${fld('invoice_url', o.invoice_url)}
        ${fld('invoice_amount_usd', o.invoice_amount_usd)}
        ${fld('payment_tx_ref', o.payment_tx_ref)}
        ${fld('paid_at', o.paid_at)}
      </dl>
    </div>
    <div class="modal-section">
      <h3>▍ Fulfillment</h3>
      <dl class="modal-grid">
        ${fld('assembled_at', o.assembled_at)}
        ${fld('shipped_at', o.shipped_at)}
        ${fld('bundle_sha256', o.bundle_sha256)}
        ${fld('download_url', o.download_url)}
        ${fld('hedera_anchor_tx', o.hedera_anchor_tx)}
        ${fld('payload_sha256', o.payload_sha256)}
      </dl>
    </div>
    <div class="modal-section">
      <h3>▍ Flip status</h3>
      <div class="flips">
        ${flipBtn('invoiced','→ invoiced')}
        ${flipBtn('paid','→ paid')}
        ${flipBtn('assembled','→ assembled')}
        ${flipBtn('shipped','→ shipped')}
        ${flipBtn('cancelled','✗ cancel')}
      </div>
    </div>
    <div class="modal-section">
      <h3>▍ Event log (${d.events.length})</h3>
      ${d.events.map(e => `<div class="event-row">
        <time>${(e.created_at||'').slice(0,19)}</time>
        <span class="type">[${esc(e.event_type)}]</span>
        actor=${esc(e.actor)}
        ${e.from_status ? esc(e.from_status)+' → '+esc(e.to_status) : ''}
        ${e.detail ? '<div class="detail">'+esc(e.detail)+'</div>' : ''}
      </div>`).join('')}
    </div>
    <div class="modal-section">
      <h3>▍ Email receipts (${d.receipts.length})</h3>
      ${d.receipts.length === 0 ? '<div style="color:#737373;font-size:12px;">none</div>' : d.receipts.map(r => `<div class="event-row">
        <time>${(r.sent_at||'').slice(0,19)}</time>
        <span class="type">[${esc(r.receipt_type)}]</span>
        to=${esc(r.email_to)}
        ${r.delivered ? '<span style="color:#84cc16">✓</span>' : (r.delivered === 0 ? '<span style="color:#f43f5e">✗</span>' : '—')}
        ${r.email_provider_id ? '<div class="detail">resend '+esc(r.email_provider_id)+'</div>' : ''}
        ${r.error ? '<div class="detail" style="color:#f43f5e">'+esc(r.error)+'</div>' : ''}
      </div>`).join('')}
    </div>
  `;
  $('modal').classList.add('show');
}
function closeModal() { $('modal').classList.remove('show'); }

async function flipStatus(id, to) {
  const detail = prompt(`flip ${id} → ${to}\noptional note (or cancel for none):`, '');
  if (detail === null) return;
  const body = { to_status: to, actor: 'human:dashboard', detail: detail || null };
  const r = await api('/admin/order/' + id + '/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (r && r.ok) {
    toast(`${id}: ${r.from} → ${r.to}`);
    openOrder(id);  // refresh modal
    loadAll();
  } else {
    toast('flip failed', true);
  }
}

async function loadAll() {
  await Promise.all([loadStats(), loadOrders()]);
  $('liveStatus').textContent = 'updated ' + new Date().toTimeString().slice(0,8);
}

$('qInput').addEventListener('input', () => { clearTimeout(window._d); window._d = setTimeout(loadAll, 300); });
$('statusFilter').addEventListener('change', loadAll);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

loadAll();
setInterval(loadAll, POLL_MS);
</script>
</body>
</html>
"""
