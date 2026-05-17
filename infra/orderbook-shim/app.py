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

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field

# ─── config ─────────────────────────────────────────────────────────────────

DB_PATH = Path(os.environ.get("ORDERBOOK_DB_PATH", "/data/orders.db"))
MIGRATIONS_DIR = Path(os.environ.get("ORDERBOOK_MIGRATIONS_DIR", "/app/migrations"))
API_KEY = os.environ.get("ORDERBOOK_API_KEY", "")
VERSION = "0.1.0"


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
    if not x_orderbook_key or x_orderbook_key != API_KEY:
        raise HTTPException(status_code=401, detail="invalid X-Orderbook-Key")


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
    """Public — no auth. Quick liveness + DB reachability check."""
    try:
        with db() as conn:
            row = conn.execute("SELECT COUNT(*) AS n FROM orders").fetchone()
            n_orders = row["n"]
        return {"ok": True, "version": VERSION, "db_path": str(DB_PATH), "n_orders": n_orders, "ts": now_iso()}
    except Exception as e:
        return JSONResponse({"ok": False, "error": str(e)[:200]}, status_code=503)


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
