# NutriScan Vision AI 🍽️🤖

AI-powered food analysis app that detects food items from images and estimates calories.

## 🔗 Live Demo
https://nutriscan-vision-ai.netlify.app

## ⚙️ Tech Stack
- React (TypeScript) + Tailwind CSS
- Node.js + Express
- MongoDB (Mongoose)
- OpenAI Vision (image analysis)
- Multer (image upload)
- Render (backend), Netlify (frontend)

## ✨ Features
- Upload food image → AI analysis
- Multi-item detection with calories & macros
- Confidence scoring
- User authentication (JWT)
- Per-user history
- Caching using image hashing (SHA-256) to reduce AI cost

## 🧠 How it works
1. Upload image → stored on server
2. Generate SHA-256 hash
3. If cached → return result
4. Else → call AI → store → return

## 📸 Screenshots
(Add 2–3 screenshots)

## 🚀 Run locally
```bash
# backend
npm install
npm run dev

# frontend
npm install
npm run dev
