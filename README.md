# Brew & Bloom
A cozy productivity and wellness web application that brings together café culture, focused studying, and healthy habit tracking.

## About
Brew & Bloom is designed to make studying and building healthy habits feel more enjoyable. Users can choose a café-style drink before starting a focus session, watch it brew, and receive a digital café receipt with drink information.
The application will also allow users to track wellness habits such as meals, hydration, caffeine intake, and mood.

## Features
### Core Features
* Select a drink before a focus session
* Interactive brewing animation
* Pomodoro focus timer
* Digital café receipt with drink information
* Hydration tracking
* Meal tracking
* Caffeine tracking
* Mood tracking
### Future Features
* AI-powered meal recognition
* Personalized study insights
* Personalized habit suggestions
* Virtual pets and plants
* Customizable virtual café
* Achievements and unlockable decorations

## Technologies
Technologies are currently being explored. Potential technologies include:
React / Angular
Python / FastAPI
PostgreSQL
OpenAI API
Figma
GitHub

## Getting Started
Clone the repository:
git clone <repository-url>
cd <repository-name>
Install dependencies:
npm install
Start the development server:
npm run dev

### Backend API
The drinks API uses PostgreSQL. Create a database named `brew_bloom`, copy `backend/.env.example` to `backend/.env`, and set `DATABASE_URL` to your PostgreSQL connection string. Then install and start the backend:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

On startup, the backend creates the `drinks` table and inserts any missing sample drinks. The API is available at `http://localhost:8000/api/drinks`; interactive documentation is at `http://localhost:8000/docs`.

## Team
TBD
