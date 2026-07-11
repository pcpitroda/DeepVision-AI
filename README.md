# 🛡️ DeepVision AI – AI Generated Image Detection

<div align="center">

# DeepVision AI

### Detect AI-Generated Images Using Deep Learning

A modern web application that detects whether an uploaded image is **Real** or **AI-Generated** using a **ResNet50 Deep Learning Model**. The project combines a **React + Vite frontend** with a **Flask backend** to deliver fast and reliable predictions through an intuitive user interface.

---

![Home Page](images/home.png)

![Prediction Result](images/prediction.png)

</div>

---

# 📑 Table of Contents

* About the Project
* Problem Statement
* Features
* How It Works
* Technology Stack
* Project Structure
* Installation
* Running the Project
* Usage
* Model Information
* Future Improvements
* Screenshots
* Author
* License

---

# 📖 About the Project

With the rapid advancement of Artificial Intelligence, AI-generated images have become increasingly realistic, making it difficult to distinguish them from authentic photographs. These synthetic images can be used for misinformation, identity manipulation, fake news, social media deception, and digital fraud.

**DeepVision AI** is a Deep Learning-based web application designed to identify whether an uploaded image is **Real** or **AI Generated**. The system utilizes a pretrained **ResNet50** Convolutional Neural Network (CNN) for binary image classification.

The application provides a clean web interface where users can upload an image and instantly receive the prediction along with the confidence score.

---

# 🎯 Problem Statement

As AI image generation tools continue to improve, identifying manipulated or synthetic images has become increasingly challenging.

The objective of this project is to develop an intelligent system capable of detecting AI-generated images using Deep Learning techniques, helping users verify image authenticity.

---

# ✨ Features

* Detect Real and AI-Generated Images
* Upload Images through Web Interface
* Confidence Score Prediction
* Fast Image Processing
* Deep Learning Powered
* Modern React Frontend
* Flask REST API Backend
* User-Friendly Interface
* Responsive Design

---

# ⚙️ How It Works

```text
User Uploads an Image
          │
          ▼
Frontend (React + Vite)
          │
          ▼
Flask Backend API
          │
          ▼
Image Preprocessing
          │
          ▼
ResNet50 Deep Learning Model
          │
          ▼
Prediction
          │
          ▼
Real Image / AI Generated Image
```

---

# 🧠 Model Architecture

The application uses a **ResNet50** Convolutional Neural Network trained through Transfer Learning.

### Workflow

1. User uploads an image.
2. The backend receives the image.
3. Image preprocessing is applied.
4. The image is resized and normalized.
5. The processed image is passed to the trained ResNet50 model.
6. The model predicts whether the image is Real or AI Generated.
7. The prediction and confidence score are displayed on the frontend.

---

# 🛠 Technology Stack

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

## Backend

* Python
* Flask
* Flask-CORS

## Deep Learning

* PyTorch
* Torchvision
* ResNet50

## Tools

* Git
* GitHub
* VS Code

---

# 📂 Project Structure

```text
DeepVision-AI/
│
├── backend/
│   ├── model/
│   ├── uploads/
│   ├── app.py
│   ├── predict.py
│   └── requirements.txt
│
├── src/
├── public/
├── package.json
├── vite.config.ts
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/DeepVision-AI.git
```

```bash
cd DeepVision-AI
```

---

## 2. Install Backend Dependencies

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv venv
```

Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install required packages

```bash
pip install -r requirements.txt
```

---

## 3. Start Flask Server

```bash
python app.py
```

The backend will start running on:

```text
http://127.0.0.1:5000
```

---

## 4. Install Frontend Dependencies

Open a new terminal.

```bash
npm install
```

---

## 5. Start React Application

```bash
npm run dev
```

The frontend will start at

```text
http://localhost:5173
```

---

# 💻 Usage

1. Open the application in your browser.
2. Upload an image.
3. Click on the **Detect** button.
4. Wait for the prediction.
5. View whether the image is **Real** or **AI Generated** along with the confidence score.

---

# 📊 Model Information

| Property       | Details                       |
| -------------- | ----------------------------- |
| Model          | ResNet50                      |
| Framework      | PyTorch                       |
| Classification | Binary                        |
| Classes        | Real / AI Generated           |
| Input          | Uploaded Image                |
| Output         | Prediction + Confidence Score |

---

# 📸 Screenshots

## Home Page

> Replace the image below with your project screenshot.

```text
images/home.png
```

```markdown
![Home Page](images/home.png)
```

---

## Prediction Result

> Replace the image below with your prediction screenshot.

```text
images/prediction.png
```

```markdown
![Prediction](images/prediction.png)
```

---

# 📈 Future Improvements

* Video Deepfake Detection
* Explainable AI (XAI)
* Batch Image Prediction
* Cloud Deployment
* Mobile Application
* Support for Multiple AI Models
* Improved Detection Accuracy

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 👨‍💻 Author

**Priyanshi Pitroda**

MCA Student

Parul University

GitHub: https://github.com/pcpitroda

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you found this project helpful, don't forget to Star the repository!

Made with ❤️ using React, Flask, PyTorch and Deep Learning.

</div>
