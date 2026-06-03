# Nextpick 📚

A book recommendation web app powered by collaborative filtering. Enter a book you love and Nextpick surfaces 4 similar titles you're likely to enjoy — plus a curated list of the Top 50 books ranked by reader ratings and votes.

---

## ✨ Features

- **Top 50 Books** — Homepage showcasing the most celebrated books, ranked by average rating and number of reader votes.
- **Smart Recommendations** — Type any book title and get 4 personalized recommendations using a collaborative filtering ML model.
- **Autocomplete Search** — Debounced search suggestions as you type, powered by the backend model index.
- **Clean Book Cards** — Each result shows the cover image, title, and author.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask, Flask-CORS |
| ML Model | Collaborative Filtering (cosine similarity, pickle) |
| Frontend | React 18, Vite, React Router |
| Styling | CSS Modules |

---

## 📁 Project Structure

```
Nextpick/
├── app.py                     # Flask backend (API routes + serves React build)
├── requirements.txt           # Python dependencies
├── procfile                   # Gunicorn entry point for deployment
├── recommender_system_model.ipynb  # Jupyter notebook for model training
├── books.pkl                  # Processed books data
├── popular.pkl                # Top 50 popular books data
├── pt.pkl                     # Pivot table (book-user matrix)
├── similarity_scores.pkl      # Precomputed cosine similarity matrix
├── datasets/
│   ├── Books.csv.zip
│   ├── Ratings.csv.zip
│   └── Users.csv.zip
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── pages/
    │   │   ├── Home.jsx        # Top 50 books page
    │   │   └── Recommend.jsx   # Search & recommendations page
    │   └── components/
    │       ├── BookCard.jsx
    │       └── Navbar.jsx
    ├── dist/                   # Production build (served by Flask)
    └── package.json
```


## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/popular` | Returns the top 50 popular books with title, author, image, votes, and rating |
| `POST` | `/api/recommend` | Accepts `{ "book_name": "..." }` and returns 4 similar books |
| `GET` | `/api/autocomplete?q=...` | Returns up to 10 title suggestions matching the query |

---

## 🧠 How the Model Works

1. **Data** — Uses the data with books, ratings, and users.
2. **Filtering** — Only books with 250+ ratings and users with 200+ ratings are kept to reduce noise.
3. **Pivot Table** — A user-book matrix is created where each cell is a user's rating for a book.
4. **Similarity** — Cosine similarity is computed between all book vectors.
5. **Recommendations** — Given a book title, the top 4 most similar books are returned.
