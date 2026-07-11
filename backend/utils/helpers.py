import logging
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename: str) -> bool:
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def setup_logger(name: str) -> logging.Logger:
    """Setup and return a configured logger."""
    logging.basicConfig(level=os.getenv('LOG_LEVEL', 'INFO'))
    return logging.getLogger(name)
