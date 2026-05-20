from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import json
import sqlparse
import sqlglot
from lxml import etree
from sqlalchemy.orm import Session
from hashids import Hashids
from . import models, database

router = APIRouter()
hashids = Hashids(salt="unitools_salt", min_length=6)

# --- Schemas ---
class FormatRequest(BaseModel):
    content: str

class FormatResponse(BaseModel):
    formatted: str
    is_valid: bool
    error: str | None = None

class ShortenRequest(BaseModel):
    url: str

class ShortenResponse(BaseModel):
    short_url: str
    short_code: str

# --- Endpoints ---

@router.post("/format/json", response_model=FormatResponse)
def format_json(req: FormatRequest):
    try:
        parsed = json.loads(req.content)
        formatted = json.dumps(parsed, indent=2, ensure_ascii=False)
        return FormatResponse(formatted=formatted, is_valid=True)
    except json.JSONDecodeError as e:
        return FormatResponse(formatted=req.content, is_valid=False, error=str(e))

@router.post("/format/sql", response_model=FormatResponse)
def format_sql(req: FormatRequest):
    try:
        # Strictly validate MS SQL syntax using sqlglot
        sqlglot.parse(req.content, read="tsql")
        
        # If valid, format using sqlparse for nice spacing
        formatted = sqlparse.format(req.content, reindent=True, keyword_case='upper')
        return FormatResponse(formatted=formatted, is_valid=True)
    except sqlglot.errors.ParseError as e:
        return FormatResponse(formatted=req.content, is_valid=False, error=str(e))
    except Exception as e:
        return FormatResponse(formatted=req.content, is_valid=False, error=str(e))

@router.post("/format/xml", response_model=FormatResponse)
def format_xml(req: FormatRequest):
    try:
        parser = etree.XMLParser(remove_blank_text=True)
        root = etree.fromstring(req.content.encode('utf-8'), parser)
        formatted = etree.tostring(root, pretty_print=True, encoding='unicode')
        return FormatResponse(formatted=formatted, is_valid=True)
    except etree.XMLSyntaxError as e:
        return FormatResponse(formatted=req.content, is_valid=False, error=str(e))

@router.post("/shorten", response_model=ShortenResponse)
def shorten_url(req: ShortenRequest, db: Session = Depends(database.get_db)):
    # Check if exists
    existing = db.query(models.URLMapping).filter(models.URLMapping.original_url == req.url).first()
    if existing:
        return ShortenResponse(short_url=f"/{existing.short_code}", short_code=existing.short_code)

    # Create new
    new_mapping = models.URLMapping(original_url=req.url, short_code="")
    db.add(new_mapping)
    db.commit()
    db.refresh(new_mapping)

    # Generate short code based on ID
    short_code = hashids.encode(new_mapping.id)
    new_mapping.short_code = short_code
    db.commit()

    return ShortenResponse(short_url=f"/{short_code}", short_code=short_code)


