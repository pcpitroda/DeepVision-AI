import torch
from PIL import Image
from transformers import (
    AutoImageProcessor,
    SiglipForImageClassification
)


class DeepVisionInference:

    def __init__(self, weights_path=None):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        self.model_name = "Ateeqq/ai-vs-human-image-detector"

        print("Loading processor...")
        self.processor = AutoImageProcessor.from_pretrained(
            self.model_name
        )

        print("Loading model...")
        self.model = SiglipForImageClassification.from_pretrained(
            self.model_name
        )

        self.model.to(self.device)
        self.model.eval()

        print("Model loaded successfully")

    def predict(self, image_path):

        image = Image.open(image_path).convert("RGB")

        inputs = self.processor(
            images=image,
            return_tensors="pt"
        ).to(self.device)

        with torch.no_grad():

            outputs = self.model(**inputs)

            logits = outputs.logits

            probabilities = torch.softmax(
                logits,
                dim=-1
            )

        predicted_idx = logits.argmax(-1).item()

        predicted_label = (
            self.model.config.id2label[predicted_idx]
        ).lower()

        ai_score = 0.0
        human_score = 0.0

        for i, label in self.model.config.id2label.items():

            score = probabilities[0, i].item()

            if "ai" in label.lower():
                ai_score = score

            elif "hum" in label.lower():
                human_score = score

        prediction = (
            "FAKE"
            if "ai" in predicted_label
            else "REAL"
        )

        confidence = max(ai_score, human_score) * 100

        return {
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "probabilities": {
                "real": round(human_score, 4),
                "fake": round(ai_score, 4),
            },
            "reasoning":
                "AI-generated image patterns detected."
                if prediction == "FAKE"
                else
                "Natural human image characteristics detected."
        }