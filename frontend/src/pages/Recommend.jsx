import { useState, useRef, useEffect } from 'react'
import BookCard from '../components/BookCard.jsx'
import styles from './Recommend.module.css'

export default function Recommend() {
  const [query, setQuery]             = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [results, setResults]         = useState(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [searched, setSearched]       = useState(false)
  const debounceRef = useRef(null)
  const inputRef    = useRef(null)

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(data => { setSuggestions(data); setShowDropdown(true) })
        .catch(() => setSuggestions([]))
    }, 220)
  }, [query])

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    doRecommend(query.trim())
  }

  function doRecommend(bookName) {
    setQuery(bookName); setSuggestions([]); setShowDropdown(false)
    setLoading(true); setError(null); setSearched(true)
    fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book_name: bookName }),
    })
      .then(r => { if (!r.ok) throw new Error('Book not found. Try another title.'); return r.json() })
      .then(data => { setResults(data); setLoading(false) })
      .catch(err => { setError(err.message); setResults(null); setLoading(false) })
  }

  function pickSuggestion(book) {
    setQuery(book); setSuggestions([]); setShowDropdown(false); inputRef.current?.focus()
  }

  useEffect(() => {
    function onDown(e) { if (!e.target.closest(`.${styles.searchWrap}`)) setShowDropdown(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <p className={styles.eyebrow}>Powered by collaborative filtering</p>
        <h1 className={styles.heading}>Find Your Next Read</h1>
        <p className={styles.sub}>
          Type a book you love and we'll surface four similar titles you're likely to enjoy.
        </p>
      </section>

      <section className={styles.searchSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="e.g. The Da Vinci Code"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              autoComplete="off"
            />
            {showDropdown && suggestions.length > 0 && (
              <ul className={styles.dropdown}>
                {suggestions.map((s, i) => (
                  <li key={i} className={styles.dropItem} onMouseDown={() => pickSuggestion(s)}>{s}</li>
                ))}
              </ul>
            )}
          </div>
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Recommend'}
          </button>
        </form>
      </section>

      <section className={styles.results}>
        {loading && (
          <div className={styles.state}><span className={styles.spinner} /><p>Finding similar books…</p></div>
        )}
        {error && (
          <div className={styles.state}>
            <p className={styles.errorIcon}>📭</p>
            <p className={styles.errorText}>{error}</p>
            <p className={styles.muted}>Try a different title or check the spelling.</p>
          </div>
        )}
        {!loading && !error && results && (
          <>
            <p className={styles.resultsLabel}>Here are some books you’re surely gonna love.</p>
            <div className={styles.grid}>
              {results.map((book, i) => (
                <div key={i} className={styles.cardWrapper} style={{ animationDelay: `${i * 80}ms` }}>
                  <BookCard title={book.title} author={book.author} image={book.image} />
                </div>
              ))}
            </div>
          </>
        )}
        {!loading && !error && !results && searched && (
          <div className={styles.state}><p>No results returned. Try another book.</p></div>
        )}
      </section>
    </main>
  )
}
