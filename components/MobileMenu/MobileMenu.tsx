// src/components/Header/MobileMenu.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../Header/Header.module.css';
import { Icon } from '../Header/Icons';

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
      {/* Header частина в overlay */}
      <div className={styles.mobileHeader}>
        <Link href="/" className={styles.logo}>
          <Icon
            name="icon-logoc"
            className={styles.logoIcon}
            sizeH={17}
            sizeW={81}
            color="black"
          />
        </Link>

        <div className={styles.mobileRight}>
          <div className={styles.mobileMenuBtnCircle}>
            <button
              className={styles.mobileClose}
              onClick={onClose}
              aria-label="Закрити меню"
            >
              <Icon
                name="icon-close"
                className={styles.closeIcon}
                sizeH={13}
                sizeW={13}
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

      {/* Навігація */}
      <nav className={styles.mobileNav}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={styles.mobileNavLink}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Кнопки */}
      <div className={styles.mobileActions}>
        {!isAuthenticated ? (
          <>
            <Link
              href="/auth/login"
              onClick={onClose}
              className={styles.mobileActionLogin}
            >
              Вхід
            </Link>
            <Link
              href="/auth/register"
              onClick={onClose}
              className={styles.mobileActionRegister}
            >
              Реєстрація
            </Link>
          </>
        ) : (
          <Link
            href="/profile"
            onClick={onClose}
            className={styles.mobileActionRegister}
          >
            Кабінет
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
