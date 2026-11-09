from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Drink
from app.schemas.drink import DrinkResponse

router = APIRouter(prefix="/api/drinks", tags=["drinks"])

@router.get("", response_model=list[DrinkResponse])
def list_drinks(db: Session = Depends(get_db)):
    """Return all drinks."""
    return db.scalars(select(Drink).order_by(Drink.id)).all()

 
@router.get("/{drink_id}", response_model=DrinkResponse)
def get_drink(drink_id: int, db: Session = Depends(get_db)):
    """Return one drink by id, or 404 if it doesn't exist."""
    drink = db.get(Drink, drink_id)
    if drink is None:
        raise HTTPException(status_code=404, detail="Drink not found")
    return drink
