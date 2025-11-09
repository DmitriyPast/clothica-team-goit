'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useAuthStore } from '@/lib/store/authStore';
import { Icon } from './Icons';
import { link } from 'fs';

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
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Icon
            name="icon-logoc"
            className={styles.logoIcon}
            sizeH={17}
            sizeW={81}
            color="black"
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
              <button
                className={styles.btnLogin}
                onClick={() => router.push('/auth/login')}
              >
                Вхід
              </button>
              <button
                className={styles.btnRegister}
                onClick={() => router.push('/auth/register')}
              >
                Реєстрація
              </button>
            </>
          ) : (
            <button
              className={styles.btnCabinet}
              onClick={() => router.push('/profile')} // cabinet
            >
              Кабінет
            </button>
          )}
          <div className={styles.mobileMenuBtnCircle}>
            <button
              className={styles.burgerBtn}
              aria-label="Відкрити меню"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon
                name="icon-burger"
                className={styles.burgerIcon}
                sizeH={13}
                sizeW={19}
              />
            </button>
          </div>
          <Link href="/basket" className={styles.cartLink} aria-label="Кошик">
            <div className={styles.cartCircle}>
              <Icon
                name="icon-cart"
                className={styles.cartIcon}
                sizeH={21}
                sizeW={21}
              />
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
          // якщо авторизований — викликаємо logout з store
          if (isAuthenticated) logout();
          setMobileMenuOpen(false);
        }}
        links={links}
      />
    </header>
  );
};

export default Header;
