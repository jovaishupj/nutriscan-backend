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
<img width="1250" height="772" alt="image" src="https://github.com/user-attachments/assets/6c77d0c8-be4f-4bb2-8885-8c5b6e3dde43" />
<img width="1563" height="896" alt="image" src="https://github.com/user-attachments/assets/c53076b1-33a0-4bbd-98c9-bb520df5cb7b" />
<img width="1450" height="921" alt="image" src="https://github.com/user-attachments/assets/2f6e5c11-e957-4d81-b2db-213f8d346986" />


## 🚀 Run locally
```bash
# backend
npm install
npm run dev

# frontend
npm install
npm run dev
