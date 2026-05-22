import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard.jsx'
import styles from './Home.module.css'

export default function Home() {
  const [books, setBooks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    fetch('/api/popular')
      .then(r => { if (!r.ok) throw new Error('Failed to load books'); return r.json() })
      .then(data => { setBooks(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <p className={styles.eyebrow}>Curated by ratings &amp; votes</p>
        <h1 className={styles.heading}>Top <em>50</em> Books</h1>
        <p className={styles.sub}>
          A handpicked list of the most celebrated books, ranked by reader
          ratings across thousands of reviews.
        </p>
      </section>

      <section className={styles.section}>
        {loading && (
          <div className={styles.state}>
            <span className={styles.spinner} />
            <p>Loading books…</p>
          </div>
        )}
        {error && (
          <div className={styles.state}>
            <p className={styles.errorText}>⚠ {error}</p>
            <p className={styles.muted}>Make sure Flask is running on port 5000.</p>
          </div>
        )}
        {!loading && !error && (
          <div className={styles.grid}>
            {books.map((book, i) => (
              <div key={i} className={styles.cardWrapper}
                style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}>
                <BookCard
                  title={book.title} author={book.author}
                  image={book.image} votes={book.votes} rating={book.rating}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
