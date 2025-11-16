import css from './AuthHeader.module.css';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className={`${css.authHeader}`}>
      <Link href='/'>
        <img src="/logo.svg" alt="logo" className={css.logo} />
      </Link>
    </header>
  );
}
