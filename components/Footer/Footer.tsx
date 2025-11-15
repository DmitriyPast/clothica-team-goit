"use client";

import { useState } from "react";
import Link from "next/link";
import { toast, type ToastPosition } from "react-hot-toast";
import css from "./Footer.module.css";

// 🧩 Вбудований messageService
enum MyToastType {
  success = "success",
  error = "error",
  loading = "loading",
  custom = "custom",
}

interface ToastProps {
  duration: number;
  position: ToastPosition;
}

function toastMessage(toastType: MyToastType, text: string) {
  const toastProps: ToastProps = {
    duration: 3000,
    position: "top-right",
  };
  return toast[toastType](text, toastProps);
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const isDisabled = isSubmitting || isLocked;
  const API = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;

    setIsLocked(true);
    const unlockEarly = setTimeout(() => setIsLocked(false), 1200);

    if (!API) {
      toastMessage(MyToastType.error, "Не налаштовано NEXT_PUBLIC_API_URL.");
      clearTimeout(unlockEarly);
      setIsLocked(false);
      return;
    }

    const normalizedEmail = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValid) {
      toastMessage(MyToastType.error, "Введіть коректний email.");
      clearTimeout(unlockEarly);
      setIsLocked(false);
      return;
    }

    let toastLoadingId: string | undefined;

    try {
      setIsSubmitting(true);
      toastLoadingId = toastMessage(
        MyToastType.loading,
        "Відправляю підписку…"
      ) as unknown as string;

      const res = await fetch(`${API}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || `Помилка підписки (статус ${res.status}).`
        );
      }

      setEmail("");
      toastMessage(MyToastType.success, "Готово! Ви підписані на розсилку.");
    } catch (err: any) {
      toastMessage(
        MyToastType.error,
        err?.message || "Щось пішло не так. Спробуйте пізніше."
      );
    } finally {
      if (toastLoadingId) toast.dismiss(toastLoadingId);
      setIsSubmitting(false);
      clearTimeout(unlockEarly);
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 800);
    }
  };

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.containerWrap}>
          <div className={css.linksContainer}>
            <a href="/" aria-label="На головну" className={css.logo}>
              <svg width="84" height="36" aria-hidden="true">
                <use href="/logo.svg"></use>
              </svg>
            </a>

            <div className={css.footerMenu}>
              <h2 className={css.menu}>Меню</h2>
              <ul className={css.footerList}>
                <li className={css.footerItem}>
                  <a href="/" className={css.footerLink}>Головна</a>
                </li>
                <li className={css.footerItem}>
                  <a href="/products" className={css.footerLink}>Товари</a>
                </li>
                <li className={css.footerItem}>
                  <a href="/categories" className={css.footerLink}>Категорії</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={css.subscribeWrap}>
            <h3 className={css.subscribe}>Підписатися</h3>
            <p className={css.text}>Отримуйте новини та знижки першими</p>
            <div className={css.inputSubscribe}>
              <form onSubmit={onSubmit} className={css.inputSubscribe}>
                <input
                  type="email"
                  placeholder="Введіть ваш email"
                  className={css.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isDisabled}
                />
                <button type="submit" className={css.button} disabled={isDisabled}>
                  Підписатися
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={css.footerSocials}>
          <p className={css.rights}>© 2025 Clothica. Всі права захищені.</p>
          <ul className={css.socialList}>
            <li className={css.socialItem}>
              <Link
                href="https://www.facebook.com"
                aria-label="facebook"
                target="_blank"
                className={css.socialLinks}
              >
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#Facebook"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link
                href="https://www.instagram.com"
                aria-label="Instagram"
                target="_blank"
                className={css.socialLinks}
              >
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#Instagram"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link
                href="https://x.com"
                aria-label="x"
                target="_blank"
                className={css.socialLinks}
              >
                <svg className={css.svgIcons} aria-hidden="true">
                  <use href="/sprite.svg#X"></use>
                </svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link
                href="https://www.youtube.com"
                aria-label="youtube"
                target="_blank"
                className={css.socialLinks}
              >
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
