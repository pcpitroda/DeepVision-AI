from PIL import Image
from torchvision import transforms


IMAGE_SIZE = 224

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


def preprocess_image(path):
    image = Image.open(path).convert('RGB')
    return transform(image).unsqueeze(0)
