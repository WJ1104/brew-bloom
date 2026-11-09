from pydantic import BaseModel, ConfigDict


class DrinkResponse(BaseModel):
    """What the API returns for a single drink."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    caffeine_mg: int
    focus_minutes: int
