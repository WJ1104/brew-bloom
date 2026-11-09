from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.models import Drink
from app.routers import drinks


SAMPLE_DRINKS = (
    {"id": 1, "name": "Matcha", "caffeine_mg": 70, "focus_minutes": 25},
    {"id": 2, "name": "Chai", "caffeine_mg": 50, "focus_minutes": 25},
    {"id": 3, "name": "Latte", "caffeine_mg": 120, "focus_minutes": 45},
    {"id": 4, "name": "Cappuccino", "caffeine_mg": 130, "focus_minutes": 50},
)


def initialize_database():
    """Create the drinks table and add any missing sample rows."""
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        for drink_data in SAMPLE_DRINKS:
            existing_id = db.scalar(
                select(Drink.id).where(
                    (Drink.id == drink_data["id"])
                    | (Drink.name == drink_data["name"])
                )
            )
            if existing_id is None:
                db.add(Drink(**drink_data))
        if db.new:
            db.commit()


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield

app = FastAPI(
    title="Brew & Bloom API",
    description="Backend API for the Brew & Bloom productivity and wellness app",
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(drinks.router)

# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the Brew & Bloom API!"}

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "Brew & Bloom backend is running!"
    }
