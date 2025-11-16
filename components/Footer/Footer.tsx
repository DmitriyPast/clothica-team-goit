'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import css from './Footer.module.css';

const sendSubscription = async (email: string) => {
  try {
    const res = await axios.post('/subscriptions', { email });
    return res.data.message;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error || 'Не вдалося створити підписку'
    );
  }
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email обов’язковий');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Невірний формат email');
      return;
    }

    setLoading(true);
    try {
      const message = await sendSubscription(email);
      toast.success(message);
      setEmail('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={css.footer}>
      <Toaster position="top-right" />
      <div className="container">
        <div className={css.containerWrap}>
          <div className={css.linksContainer}>
            <Link href="/" aria-label="На головну" className={css.logo}>
              <svg width="84" height="36" aria-hidden="true">
                <use href="/logo.svg"></use>
              </svg>
            </Link>
            <div className={css.footerMenu}>
              <h2 className={css.menu}>Меню</h2>
              <ul className={css.footerList}>
                <li className={css.footerItem}>
                  <Link href="/" className={css.footerLink}>Головна</Link>
                </li>
                <li className={css.footerItem}>
                  <Link href="/goods" className={css.footerLink}>Товари</Link>
                </li>
                <li className={css.footerItem}>
                  <Link href="/categories" className={css.footerLink}>Категорії</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={css.subscribeWrap}>
            <h3 className={css.subscribe}>Підписатися</h3>
            <p className={css.text}>Отримуйте новини та знижки першими</p>
            <form onSubmit={handleSubmit} className={css.inputSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введіть ваш email"
                className={css.input}
                disabled={loading}
              />
              <button type="submit" className={css.button} disabled={loading}>
                {loading ? 'Надсилання...' : 'Підписатися'}
              </button>
            </form>
          </div>
        </div>

        <div className={css.footerSocials}>
          <p className={css.rights}>© 2025 Clothica. Всі права захищені.</p>
          <ul className={css.socialList}>
            <li className={css.socialItem}>
              <Link href="https://www.facebook.com" target="_blank" aria-label="facebook" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#Facebook"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#Instagram"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://x.com" target="_blank" aria-label="x" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#X"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.youtube.com" target="_blank" aria-label="youtube" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#Youtube"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
