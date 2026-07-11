import torch
from torch import nn


class DeepVisionCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64, 32),
            nn.ReLU(inplace=True),
            nn.Linear(32, 2),
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)


def load_model(weights_path, device):
    model = DeepVisionCNN().to(device)
    try:
        state = torch.load(weights_path, map_location=device)
        model.load_state_dict(state)
        model.eval()
        return model, False
    except (FileNotFoundError, RuntimeError, ValueError):
        return model.eval(), True
