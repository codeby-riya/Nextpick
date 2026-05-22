from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import os

popular_df = pickle.load(open('popular.pkl', 'rb'))
pt         = pickle.load(open('pt.pkl', 'rb'))
books      = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

app = Flask(__name__, static_folder='frontend/dist', static_url_path='')
CORS(app)


# ── API: Popular books ──────────────────────────────────────────
@app.route('/api/popular')
def popular():
    data = []
    for i in range(len(popular_df)):
        data.append({
            'title':  popular_df['Book-Title'].values[i],
            'author': popular_df['Book-Author'].values[i],
            'image':  popular_df['Image-URL-M'].values[i],
            'votes':  int(popular_df['num_ratings'].values[i]),
            'rating': round(float(popular_df['avg_rating'].values[i]), 2),
        })
    return jsonify(data)


# ── API: Recommend books ────────────────────────────────────────
@app.route('/api/recommend', methods=['POST'])
def recommend():
    user_input = request.json.get('book_name', '')

    if user_input not in pt.index:
        return jsonify({'error': 'Book not found in recommendation system'}), 404

    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(
        list(enumerate(similarity_scores[index])),
        key=lambda x: x[1], reverse=True
    )[1:5]

    data = []
    for i in similar_items:
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        row = temp_df.drop_duplicates('Book-Title')
        data.append({
            'title':  row['Book-Title'].values[0],
            'author': row['Book-Author'].values[0],
            'image':  row['Image-URL-M'].values[0],
        })
    return jsonify(data)


# ── API: Autocomplete ───────────────────────────────────────────
@app.route('/api/autocomplete')
def autocomplete():
    query = request.args.get('q', '')
    suggestions = []
    if query:
        for book in pt.index:
            if query.lower() in book.lower():
                suggestions.append(book)
            if len(suggestions) >= 10:
                break
    return jsonify(suggestions)


# ── Serve React (production build) ─────────────────────────────

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):

    dist_dir = os.path.join(app.root_path, 'frontend', 'dist')

    file_path = os.path.join(dist_dir, path)

    # If requested file exists, serve it
    if path != "" and os.path.exists(file_path):
        return send_from_directory(dist_dir, path)

    # Otherwise serve React index.html
    return send_from_directory(dist_dir, 'index.html')

# ── Run ─────────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, port=5000)
