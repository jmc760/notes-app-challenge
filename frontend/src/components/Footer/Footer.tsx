import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} - <b>Notes App</b> by Juan Manuel Cerdeira. All rights reserved.</p>
    </footer>
  );
};
