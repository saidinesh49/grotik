'use client';

import { BaseComponentProps } from '@/types/ui';
import Link from 'next/link';
import styles from './Layout.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Lessons', href: '/lessons' },
  { name: 'Practice', href: '/practice' },
  { name: 'Financial Simulation', href: '/simulation' },
];

export function Layout({ children }: BaseComponentProps) {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className={styles.logo}>
                  Grotik
                </Link>
              </div>
              <div className={styles.navLinks}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={styles.navLink}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Grotik. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
