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

  // Блокуємо скрол коли відкрито мобільне меню
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Desktop links (shared)
  const links = [
    { href: '/', label: 'Головна' },
    { href: '/goods', label: 'Товари' },
    { href: '/categories', label: 'Категорії' },
  ];

  // Кнопки праворуч залежать від статусу авторизації
  // Якщо не авторизований — показуємо Вхід та Реєстрація
  // Якщо авторизований — показуємо "Кабінет" (button -> веде на /profile)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Ліва частина: лого */}
        <Link href="/" className={styles.logo}>
          <Icon
            name="icon-logoc"
            className={styles.logoIcon}
            sizeH={17}
            sizeW={81}
            color="black"
          />
        </Link>

        {/* Проміжок до навігації (точна відстань реалізована через margin в CSS) */}
        <nav className={styles.nav}>
          {links.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Права панель: кнопки та кошик */}
        <div className={styles.right}>
          {/* Для десктоп/планшет: відображаємо кнопки */}
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
              onClick={() => router.push('/profile')}
            >
              Кабінет
            </button>
          )}

          {/* Бургер-кнопка для мобільних (відображається через CSS @media) */}
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

          {/* Cart link (SVG всередині кола) */}
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

      {/* Мобільне меню (оверлей). Воно закриває скрол на body через useEffect вище */}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          // Якщо треба — викликаємо logout з store
          if (isAuthenticated) logout();
          setMobileMenuOpen(false);
        }}
        links={links}
      />
    </header>
  );
};

export default Header;
