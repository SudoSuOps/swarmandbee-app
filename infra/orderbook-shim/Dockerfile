# Swarm & Bee · Order Book Shim
# Tiny FastAPI + SQLite container. Runs on Synology DS1525+.

FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY migrations/ ./migrations/

# DB lives at /data/orders.db (mapped to host /volume1/swarm/orderbook/).
ENV ORDERBOOK_DB_PATH=/data/orders.db \
    ORDERBOOK_MIGRATIONS_DIR=/app/migrations \
    PYTHONUNBUFFERED=1

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://localhost:8000/healthz', timeout=3).status==200 else 1)"

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
