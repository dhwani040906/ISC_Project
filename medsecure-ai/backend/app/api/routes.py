
from io import BytesIO

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.schemas.prediction import PredictionResponse
from app.services.pneumonia_service import prediction_service

router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
    tags=["Prediction"],
)
async def predict_pneumonia(
    file: UploadFile = File(...),
):
    if file.content_type not in {
        "image/png",
        "image/jpeg",
        "image/webp",
    }:
        raise HTTPException(
            status_code=415,
            detail="Upload a PNG, JPEG, or WebP image.",
        )

    # Read at most 5 MB plus one byte to detect oversized uploads.
    contents = await file.read(5 * 1024 * 1024 + 1)

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Image must be 5 MB or smaller.",
        )

    try:
        image = Image.open(BytesIO(contents))
        image.verify()

        image = Image.open(BytesIO(contents))
        image.load()
    except (
        UnidentifiedImageError,
        OSError,
        Image.DecompressionBombError,
    ):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image.",
        )

    try:
        return prediction_service.predict(image)
    except Exception:
        # Avoid exposing internal paths or exception details.
        raise HTTPException(
            status_code=500,
            detail="Prediction failed.",
        )
