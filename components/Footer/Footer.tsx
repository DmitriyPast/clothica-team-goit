"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./Footer.module.css";

import showToast, { ToastType } from "@/lib/messageService";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const emailTrimmed = email.trim();
    if (!emailTrimmed) return;

    setIsSubmitting(true);

    const res = await fetch(`${API_URL}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailTrimmed }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 409) {
      // Email вже є в базі
      showToast(ToastType.error, "Ви вже оформили підписку.");
    } else if (res.ok) {
      // Успішна підписка
      setEmail("");
      showToast(ToastType.success, "Готово! Ви підписані на розсилку.");
    } else {
      // Інші помилки
      showToast(ToastType.error, data?.message || "Помилка підписки.");
    }

    setIsSubmitting(false);
  };

  return (
    <footer className={css.footer}>
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
                  <Link href="/products" className={css.footerLink}>Товари</Link>
                </li>
                <li className={css.footerItem}>
                  <Link href="/categories" className={css.footerLink}>Категорії</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={css.subscribeWrap}>
            <h3 className={css.subscribe}>Підписатися</h3>
            <form className={css.inputSubscribe} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Введіть ваш email"
                className={css.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={css.button} disabled={isSubmitting}>
                {isSubmitting ? "Відправка..." : "Підписатися"}
              </button>
            </form>
          </div>
        </div>

        <div className={css.footerSocials}>
          <p className={css.rights}>© 2025 Clothica. Всі права захищені.</p>
          <ul className={css.socialList}>
            <li className={css.socialItem}>
              <Link href="https://www.facebook.com" target="_blank" aria-label="facebook" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Facebook"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Instagram"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://x.com" target="_blank" aria-label="x" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#X"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.youtube.com" target="_blank" aria-label="youtube" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Youtube"></use></svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
