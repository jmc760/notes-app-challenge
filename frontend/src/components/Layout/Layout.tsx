import type { ReactNode } from 'react';
import { Header, Footer } from '../index';
import styles from './Layout.module.css';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
