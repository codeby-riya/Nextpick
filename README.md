# 📚 Bibliophile — Book Recommender System

A redesigned Book Recommender with a **React frontend** and **Flask backend**.
The ML model (collaborative filtering) is unchanged — only the frontend is new.

---

## ⚡ Quick Start (Two Terminals)

### Terminal 1 — Flask Backend

```bash
# From the project root folder (where app.py is)
pip install -r requirements.txt
python app.py
```

Flask starts at → **http://localhost:5000**

---

### Terminal 2 — React Frontend (Dev Mode)

```bash
# From the project root folder
cd frontend
npm install
npm run dev
```

React starts at → **http://localhost:5173**  
Open this URL in your browser. Vite auto-proxies all `/api/` calls to Flask.

---

## 🏗️ Build for Production (Optional)

If you want a single Flask server serving everything:

```bash
cd frontend
npm run build
cd ..
python app.py
```

Then open **http://localhost:5000** — Flask serves the built React app directly.

---

## 📁 Project Structure

```
book-recommender/
├── app.py                        ← Flask backend (API + serves React build)
├── requirements.txt              ← Python dependencies
├── procfile                      ← For Heroku/Render deployment
├── books.pkl                     ← Book data
├── popular.pkl                   ← Top 50 popular books
├── pt.pkl                        ← Pivot table
├── similarity_scores.pkl         ← Cosine similarity matrix
├── recommender_system_model.ipynb← Original training notebook
├── datasets/                     ← Raw CSV datasets
└── frontend/                     ← React app (Vite)
    ├── package.json
    ├── vite.config.js            ← Proxy /api → Flask:5000
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx               ← Routes setup
        ├── index.css             ← Global styles & design tokens
        ├── components/
        │   ├── Navbar.jsx        ← Shared navbar (consistent across pages!)
        │   ├── Navbar.module.css
        │   ├── BookCard.jsx      ← Reusable book card
        │   └── BookCard.module.css
        └── pages/
            ├── Home.jsx          ← Top 50 books page
            ├── Home.module.css
            ├── Recommend.jsx     ← Recommend page with autocomplete
            └── Recommend.module.css
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/popular` | Returns top 50 books as JSON |
| POST | `/api/recommend` | Body: `{"book_name":"..."}` → 4 similar books |
| GET | `/api/autocomplete?q=...` | Returns up to 10 matching titles |

---

## 🛠️ Requirements

- **Python 3.8+** with pip
- **Node.js 18+** with npm

Check versions:
```bash
python --version
node --version
npm --version
```
