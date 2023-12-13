import { AppHeader } from '@/app/(root)/components/AppHeader/AppHeader';
import { AppFooter } from '@/app/(root)/components/AppFooter/AppFooter';
import styles from './styles.module.scss';
import React from 'react';

export const metadata = {
  title: 'Clockmate',
  description: 'Your Time Tracking Buddy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <div className={styles.rootContainer}>{children}</div>
      <footer>
        <AppFooter />
      </footer>
    </>
  );
}
