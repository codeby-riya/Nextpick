import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandIcon}>📚</span>
          <span>NextPick</span>
        </NavLink>
        <ul className={styles.links}>
          <li>
            <NavLink to="/" end className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link}>
              Top Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/recommend" className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link}>
              Recommend
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
