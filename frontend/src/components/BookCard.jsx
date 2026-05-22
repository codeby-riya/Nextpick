import styles from './BookCard.module.css'

export default function BookCard({ title, author, image, votes, rating }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x280?text=No+Cover' }}
        />
        {rating && (
          <span className={styles.badge}>
            ★ {typeof rating === 'number' ? rating.toFixed(1) : rating}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
        {votes && <p className={styles.votes}>{votes.toLocaleString()} ratings</p>}
      </div>
    </div>
  )
}
