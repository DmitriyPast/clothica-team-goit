import React from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';
import Image from 'next/image';
import Header from '../Header/Header';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  links: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  isAuthenticated,
  onLogout,
  links,
}) => {
  if (!open) return null;

  return (
    <div className={styles.mobileOverlay} role="dialog" aria-modal="true">
      {/* <div className={styles.mobileHeader}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Clothica Logo"
            width={81}
            height={17}
            priority
            className={styles.logoIcon}
          />
        </Link>

        <div className={styles.mobileRight}>
          <div className={styles.mobileCloseBtnCircle}>
            <button
              className={styles.mobileClose}
              onClick={onClose}
              aria-label="Закрити меню">
              <svg
                className={styles.mobileCloseIcon}
                width={14}
                height={14}
                aria-hidden="true"
                fill="currentColor">
                <use href="/sprite.svg#closeH" />
              </svg>
            </button>
          </div>

          <Link href="/basket" className={styles.cartLink} aria-label="Кошик">
            <div className={styles.cartCircle}>
              <svg
                className={styles.cartIcon}
                width={21}
                height={21}
                aria-hidden="true"
                fill="currentColor">
                <use href="/sprite.svg#shopping_cart" />
              </svg>
              <span className={styles.cartBadge}>1</span>
            </div>
          </Link>
        </div>
      </div> */}
      {/* <Header /> */}

      <nav className={styles.mobileNav}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={styles.mobileNavLink}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className={styles.mobileActions}>
        {!isAuthenticated ? (
          <>
            <Link
              href="/auth/login"
              onClick={onClose}
              className={styles.mobileActionLogin}>
              Вхід
            </Link>
            <Link
              href="/auth/register"
              onClick={onClose}
              className={styles.mobileActionRegister}>
              Реєстрація
            </Link>
          </>
        ) : (
          <Link
            href="/profile" // cabinet
            onClick={onClose}
            className={styles.mobileActionRegister}>
            Кабінет
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
