# SummarEye AI

SummarEye AI is a web application that analyzes uploaded CCTV footage using AI (YOLO) and returns a smart event timeline.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Python FastAPI
- **AI/Detection**: YOLOv8n via Ultralytics
- **Video Processing**: OpenCV (cv2)

## Setup Instructions

### 1. Requirements
- Node.js (v16+)
- Python (3.10+)

### 2. Backend Setup
1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/Scripts/activate # Windows
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The backend will run at `http://localhost:8000`.

### 3. Frontend Setup
1. Change to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.
