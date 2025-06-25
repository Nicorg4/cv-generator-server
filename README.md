# 🧠 CV Generator Backend

This is the **backend** for the CV Generator web application.  
It receives form data, generates a Harvard-style HTML CV, and returns it as a downloadable PDF using Puppeteer and Node.js.

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **Puppeteer** (HTML to PDF)
- **CORS & Body Parser**
- 📦 Deploy: [Railway](https://railway.app)

---

## ⚙️ How It Works

1. The frontend sends a `POST` request with the full form data to `/generate`.
2. The backend uses `harvardTemplate.js` to build an HTML CV.
3. Puppeteer renders it in a headless Chromium browser and exports it as a PDF.
4. The backend sends the PDF back to the client for download.

---
