import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.statusCode}>404</h1>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        The page you are looking for does not exist or an error occurred. 🤔
      </p>
      <Link to="/notes/active" className={styles.homeButton}>
        Go to Active Notes
      </Link>
    </div>
  );
};
