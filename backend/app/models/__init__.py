from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Drink(Base):
    __tablename__ = "drinks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    caffeine_mg: Mapped[int] = mapped_column(Integer, nullable=False)
    focus_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
