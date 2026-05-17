-- Swarm & Bee · Order Book v1 · 2026-05-16
-- D1 schema for the real order ledger.
-- Source of truth for all orders. Discord becomes a notification channel; D1 owns state.

-- ─── ORDERS ──────────────────────────────────────────────────────────────────
-- One row per customer order. order_id is the customer-visible receipt key.

CREATE TABLE IF NOT EXISTS orders (
  order_id          TEXT PRIMARY KEY,           -- BAK-YYYYMMDD-XXXX
  email             TEXT NOT NULL,
  name              TEXT NOT NULL,
  company           TEXT,

  -- order shape
  channel           TEXT NOT NULL,              -- 'cli' | 'web-box' | 'web-bounty'
  sku               TEXT,                       -- 'by-the-pound' | '500-pack' | '12-pack'
  sku_id            TEXT,                       -- flavor id e.g. 'sb-dmack-royal-jelly'
  domain            TEXT,                       -- 'medical' | 'medical/diabetes' | etc.
  pairs_requested   INTEGER,
  failure_mode      TEXT,
  notes             TEXT,
  budget            TEXT,
  deadline          TEXT,
  settlement_rail   TEXT,                       -- 'stripe' | 'swarmusdc' | 'either'

  -- 12-pack specifics
  picks_json        TEXT,                       -- JSON array of picks (for /box orders)
  bundle_hash       TEXT,                       -- sha256 of the picks list

  -- state machine: pending -> invoiced -> paid -> assembled -> shipped
  status            TEXT NOT NULL DEFAULT 'pending',
  status_updated_at TEXT NOT NULL DEFAULT (datetime('now')),

  -- payment tracking
  invoice_url       TEXT,                       -- Stripe invoice link or USDC address
  invoice_amount_usd REAL,
  paid_at           TEXT,
  payment_tx_ref    TEXT,                       -- Stripe invoice id OR USDC tx hash

  -- fulfillment
  assembled_at      TEXT,
  shipped_at        TEXT,
  bundle_sha256     TEXT,
  download_url      TEXT,                       -- signed R2 URL
  download_expires_at TEXT,
  hedera_anchor_tx  TEXT,

  -- audit
  payload_sha256    TEXT NOT NULL,              -- sha256 of the original intake payload
  user_agent        TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_orders_email      ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ─── ORDER EVENTS ────────────────────────────────────────────────────────────
-- Audit trail. Every state change, email send, human note gets a row.

CREATE TABLE IF NOT EXISTS order_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id     TEXT NOT NULL,
  event_type   TEXT NOT NULL,                   -- 'created' | 'status_change' | 'email_sent' | 'note'
  from_status  TEXT,
  to_status    TEXT,
  actor        TEXT NOT NULL,                   -- 'cli' | 'web' | 'system' | 'human:<email>'
  detail       TEXT,                            -- free-form note or JSON detail
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE INDEX IF NOT EXISTS idx_events_order ON order_events(order_id, created_at);

-- ─── RECEIPTS ────────────────────────────────────────────────────────────────
-- Email receipt log. One row per email sent (order_created, invoice_sent, shipped, etc.)

CREATE TABLE IF NOT EXISTS receipts (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id          TEXT NOT NULL,
  receipt_type      TEXT NOT NULL,              -- 'order_created' | 'invoice_sent' | 'paid_confirmation' | 'shipped'
  email_to          TEXT NOT NULL,
  email_subject     TEXT,
  email_provider    TEXT,                       -- 'resend'
  email_provider_id TEXT,                       -- Resend message ID for tracking
  sent_at           TEXT NOT NULL DEFAULT (datetime('now')),
  delivered         INTEGER,                    -- 0 | 1 | NULL (unknown)
  error             TEXT,                       -- if send failed
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE INDEX IF NOT EXISTS idx_receipts_order ON receipts(order_id, sent_at);
