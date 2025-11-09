import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={`${styles.footerColumn} ${styles.brand}`}>
          <a href="#" aria-label="Clothica">
            <svg>
              <use href="/logo.svg" />
            </svg>
          </a>
        </div>

        <div className={`${styles.footerColumn} ${styles.menu}`}>
          <h3 className={`${styles.menuTitle}`}>Меню</h3>
          <ul className={`${styles.footerList}`}>
            <li className={`${styles.footerItem}`}><a href="#">Головна</a></li>
            <li className={`${styles.footerItem}`}><a href="#">Товари</a></li>
            <li className={`${styles.footerItem}`}><a href="#">Категорії</a></li>
          </ul>
        </div>

        <div className={`${styles.footerColumn} ${styles.subscribe}`}>
          <h3 className={`${styles.subTitle}`}>Підписатися</h3>
          <p>Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.</p>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Введіть ваш email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Підписатися</button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Clothica. Всі права захищені.</p>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com" aria-label="Facebook">
            <svg className={styles.icon}>
              <use href="/sprite.svg#Facebook" />
            </svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <svg className={styles.icon}>
              <use href="/sprite.svg#Instagram" />
            </svg>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <svg className={styles.icon}>
              <use href="/sprite.svg#X" />
            </svg>
          </a>
          
          <a href="https://youtube.com" aria-label="YouTube">
            <svg className={styles.icon}>
              <use href="/sprite.svg#Youtube" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
