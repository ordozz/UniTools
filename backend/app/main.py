from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from . import database, models, api

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="UniTools API")

# Configure CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development. In production, specify the frontend domain.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(database.get_db)):
    if short_code in ["health", "docs", "openapi.json", "api"]:
        raise HTTPException(status_code=404, detail="Not found")
    mapping = db.query(models.URLMapping).filter(models.URLMapping.short_code == short_code).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="URL not found")
    return RedirectResponse(url=mapping.original_url, status_code=307)
