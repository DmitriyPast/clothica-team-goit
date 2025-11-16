import css from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={`${css.authHeader}`}>
      <img src="/logo.svg" alt="logo" className={css.logo} />
    </header>
  );
}
