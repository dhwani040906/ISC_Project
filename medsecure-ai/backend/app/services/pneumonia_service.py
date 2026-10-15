
from pathlib import Path
import json

import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms


# Project root: medsecure-ai/
PROJECT_ROOT = Path(__file__).resolve().parents[3]
ARTIFACT_DIR = PROJECT_ROOT / "ml" / "artifacts"

MODEL_PATH = ARTIFACT_DIR / "pneumonia_cnn_best.pt"
CONFIG_PATH = ARTIFACT_DIR / "pneumonia_model_config.json"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class PneumoniaCNN(nn.Module):
    def __init__(self):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1)),
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(64, 2),
        )

    def forward(self, x):
        return self.classifier(self.features(x))


class PneumoniaPredictionService:
    def __init__(self):
        if not MODEL_PATH.is_file():
            raise FileNotFoundError(
                f"Model checkpoint not found: {MODEL_PATH}"
            )

        if not CONFIG_PATH.is_file():
            raise FileNotFoundError(
                f"Model configuration not found: {CONFIG_PATH}"
            )

        with CONFIG_PATH.open("r", encoding="utf-8") as file:
            config = json.load(file)

        self.threshold = float(
            config["classification_threshold"]
        )
        self.class_mapping = config["class_mapping"]

        self.device = DEVICE
        self.model = PneumoniaCNN().to(self.device)

        checkpoint = torch.load(
            MODEL_PATH,
            map_location=self.device,
            weights_only=True,
        )

        self.model.load_state_dict(
            checkpoint["model_state_dict"]
        )
        self.model.eval()

        # Must match the notebook preprocessing.
        self.transform = transforms.Compose([
            transforms.Grayscale(num_output_channels=1),
            transforms.Resize((28, 28)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5], std=[0.5]),
        ])

    def predict(self, image: Image.Image) -> dict:
        image = image.convert("L")
        tensor = self.transform(image).unsqueeze(0)
        tensor = tensor.to(self.device)

        with torch.inference_mode():
            logits = self.model(tensor)
            probabilities = torch.softmax(logits, dim=1)[0]

        pneumonia_probability = float(probabilities[1].item())
        predicted_class = (
            1 if pneumonia_probability >= self.threshold else 0
        )

        return {
            "predicted_class": self.class_mapping[
                str(predicted_class)
            ],
            "pneumonia_probability": round(
                pneumonia_probability, 6
            ),
            "threshold": self.threshold,
            "model_version": "pneumonia-cnn-v1",
            "notice": (
                "Educational research output only; "
                "not for clinical diagnosis."
            ),
        }


# Create one model instance for the running application.
prediction_service = PneumoniaPredictionService()
