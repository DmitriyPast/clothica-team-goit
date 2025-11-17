import css from './LastReviews.module.css';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
export default async function LastReviews() {
  return (
    <section className={css.section}>
      <h2 className={css.titleLastReviews}>Останні відгуки</h2>
      <ReviewsList />
    </section>
  );
}
