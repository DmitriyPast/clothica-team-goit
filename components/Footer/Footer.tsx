import Link from 'next/link';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.containerWrap}>
          <div className={css.linksContainer}>
            <a href="" aria-label="На головну" className={css.logo}>
              <svg width="84" height="36" aria-hidden="true">
                <use href="/logo.svg"></use>
              </svg>
            </a>
            <div className={css.menuContainer}>
              <h2 className={css.menu}>Меню</h2>
              <ul className={css.footerList}>
                <li className={css.footerItem}>
                  <a href="" className={css.footerLink}>
                    Головна
                  </a>
                </li>
                <li className={css.footerItem}>
                  <a href="" className={css.footerLink}>
                    Товари
                  </a>
                </li>
                <li className={css.footerItem}>
                  <a href="" className={css.footerLink}>
                    Категорії
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={css.subscribeWrap}>
            <h3 className={css.subscribe}>Підписатися</h3>
            <p className={css.text}>
              Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
            </p>
            <div className={css.inputSubscribe}>
              <form action="" className={css.inputSubscribe}>
                <input
                  type="email"
                  placeholder="Введіть ваш email"
                  className={css.input}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  required
                />
                <button type="submit" className={css.button}>
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
                <svg
                  className={css.svgIcons}
                  width="32"
                  height="32"
                  aria-hidden="true"
                >
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
                <svg
                  className={css.svgIcons}
                  width="32"
                  height="32"
                  aria-hidden="true"
                >
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
                <svg
                  className={css.svgIcons}
                  width="32"
                  height="32"
                  aria-hidden="true"
                >
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
                <svg
                  className={css.svgIcons}
                  width="32"
                  height="32"
                  aria-hidden="true"
                >
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
