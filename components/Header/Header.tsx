'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useAuthStore } from '@/lib/store/authStore';
import { link } from 'fs';
import Image from 'next/image';
import '@/app/globals.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const links = [
    { href: '/', label: 'Головна' },
    { href: '/goods', label: 'Товари' },
    { href: '/categories', label: 'Категорії' },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Clothica Logo"
            width={84}
            height={36}
            priority
            className={styles.logoIcon}
          />
        </Link>

        <nav className={styles.nav}>
          {links.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className={`btn btn-secondary ${styles.btnLogin}`}>
                Вхід
              </Link>
              <Link
                href="/auth/register"
                className={`btn btn-primary ${styles.btnRegister}`}>
                Реєстрація
              </Link>
            </>
          ) : (
            <Link href="/profile" className={styles.btnCabinet}>
              Кабінет
            </Link>
          )}
          <button
            className={`btn ${styles.burgerBtn}`}
            aria-label="Відкрити меню"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {/* <div> */}
            {!isMobileMenuOpen ? (
              <svg width={24} height={24}>
                <use
                  href="/sprite.svg#menu"
                  className={styles.burgerIcon}></use>
              </svg>
            ) : (
              <svg
                className={styles.mobileCloseIcon}
                width={14}
                height={14}
                aria-hidden="true"
                fill="currentColor">
                <use href="/sprite.svg#closeH" />
              </svg>
            )}
            {/* <Icon
              name="menu" // icon-burger
              sizeH={24}
              sizeW={24}
            /> */}
            {/* </div> */}
          </button>
          <Link href="/basket" className={styles.cartLink} aria-label="Кошик">
            <div className={styles.cartCircle}>
              <svg className={styles.cartIcon} width={24} height={24}>
                <use href="/sprite.svg#shopping_cart"></use>
              </svg>
              <span className={styles.cartBadge}>1</span>
            </div>
          </Link>
        </div>
      </div>
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          if (isAuthenticated) logout();
          setMobileMenuOpen(false);
        }}
        links={links}
      />
    </header>
  );
};

export default Header;
