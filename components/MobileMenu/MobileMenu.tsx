import React from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';
// import styles from '../Header/Header.module.css';
import stylesCart from '../Header/Header.module.css';
import { Icon } from '../Header/Icons';
import Image from 'next/image';

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
      <div className={styles.mobileHeader}>
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
              aria-label="Закрити меню"
            >
              <Icon
                name="closeH"
                className={styles.mobileCloseIcon}
                sizeH={14}
                sizeW={14}
              />
            </button>
          </div>

          <Link href="/basket" className={styles.cartLink} aria-label="Кошик">
            <div className={styles.cartCircle}>
              <Icon
                name="shopping_cart"
                className={styles.cartIcon}
                sizeH={21}
                sizeW={21}
              />
              <span className={styles.cartBadge}>1</span>
            </div>
          </Link>
        </div>
      </div>

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
            href="/profile" // cabinet
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
