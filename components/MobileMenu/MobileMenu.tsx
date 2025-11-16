import React from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';
import Image from 'next/image';
import Header from '../Header/Header';
import { User } from '@/types/user';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
  links: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  isAuthenticated,
  user,
  onLogout,
  links,
}) => {
  if (!open) return null;

  return (
    <div className={styles.mobileOverlay} role="dialog" aria-modal="true">
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
          <>
            {user?.role === 'Admin' && (
              <Link
                href="/admin"
                onClick={onClose}
                className={styles.mobileActionLogin}>
                Адмін-панель
              </Link>
            )}

            <Link
              href="/profile" // cabinet
              onClick={onClose}
              className={styles.mobileActionRegister}>
              Кабінет
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
