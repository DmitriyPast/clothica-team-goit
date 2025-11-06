import css from './page.module.css';
import NotFoundTimer from './not-found.client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub | 404 - Page Not Found',
  description: 'The page you are looking for does not exist on NoteHub.',
  alternates: {
    canonical: 'https://08-zustand-kappa-nine.vercel.app/not-found',
  },
  openGraph: {
    type: 'website',
    title: 'NoteHub | 404 - Page Not Found',
    description: 'The page you are looking for does not exist on NoteHub.',
    url: 'https://08-zustand-kappa-nine.vercel.app/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub | 404 - Page Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>NoteHub | 404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p className={css.description}>
        You will be redirected to the homepage in a few seconds…
      </p>
      <NotFoundTimer />
    </div>
  );
}
