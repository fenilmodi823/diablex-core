from fastapi import FastAPI
app = FastAPI(title="Diablex API (placeholder)")
@app.get("/health")
def health():
    return {"status": "ok", "placeholder": True}
