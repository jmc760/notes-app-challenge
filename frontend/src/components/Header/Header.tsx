import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <h1>Notes App 📝</h1>
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/notes/active" className={styles.navLink}>Active Notes</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/notes/archived" className={styles.navLink}>Archived Notes</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/notes/new" className={styles.navLink}>Create Note</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}