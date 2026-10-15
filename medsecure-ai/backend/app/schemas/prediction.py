
from pydantic import BaseModel, Field


class PredictionResponse(BaseModel):
    predicted_class: str
    pneumonia_probability: float = Field(ge=0.0, le=1.0)
    threshold: float = Field(ge=0.0, le=1.0)
    model_version: str
    notice: str
