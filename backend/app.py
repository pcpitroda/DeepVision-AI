import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from model import DeepVisionInference
from utils.helpers import setup_logger, allowed_file

load_dotenv()

logger = setup_logger('deepvision-api')

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / 'uploads'
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

MAX_CONTENT_LENGTH = 10 * 1024 * 1024

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

origins = [o.strip() for o in os.getenv('FRONTEND_ORIGINS', '*').split(',') if o.strip()]
CORS(app, resources={r'/*': {'origins': origins or '*'}})

inference_engine = DeepVisionInference(os.getenv('MODEL_WEIGHTS_PATH'))


@app.get('/health')
def health():
    return jsonify({'status': 'ok'})


@app.post('/predict')
def predict():
    image = request.files.get('image')

    if image is None:
        return jsonify({'error': 'No image file provided. Use form-data key "image".'}), 400

    if image.filename == '':
        return jsonify({'error': 'Empty file name.'}), 400

    if not allowed_file(image.filename):
        return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, webp.'}), 400

    filename = secure_filename(image.filename)
    suffix = filename.rsplit('.', 1)[1].lower()
    temp_path = UPLOAD_FOLDER / f"{uuid.uuid4().hex}.{suffix}"

    try:
        image.save(temp_path)
        result = inference_engine.predict(str(temp_path))
        logger.info('Prediction complete: %s', result['prediction'])
        return jsonify(result)
    except Exception as error:
        logger.exception('Prediction failed: %s', error)
        return jsonify({'error': 'Failed to process image.'}), 500
    finally:
        if temp_path.exists():
            temp_path.unlink(missing_ok=True)


@app.errorhandler(413)
def too_large(_):
    return jsonify({'error': 'File too large. Max size is 10MB.'}), 413


if __name__ == '__main__':
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_PORT', '5000'))
    app.run(host=host, port=port)
