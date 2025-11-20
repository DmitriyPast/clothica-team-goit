import Image from 'next/image';
import Link from 'next/link';
import { Good } from '@/types/good';
import styles from './GoodInfo.module.css';
import { Feedback } from '@/types/feedback';

type GoodInfoProps = {
  good: Good; // Good object received from the backend
  variant: 'popularGoods' | 'goodsPage';
};

export default function GoodInfo({ good, variant }: GoodInfoProps) {
  // Calculate number of likes (feedbacks with rating 4+)

  function averageRate(feedbacks: Feedback[] | undefined): number {
    if (!feedbacks || feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, f) => acc + (f.rate ?? 0), 0);
    const avg = parseFloat((sum / feedbacks.length).toFixed(2));
    return avg;
  }

  const avgRate = averageRate(good.feedbacks);

  // Calculate total number of reviews
  const reviewsCount = good.feedbacks?.length || 0;

  const starIconName = avgRate === 0 ? 'star' : 'star-filled';

  return (
    <>
      <div className={`${styles.imageWrapper} ${styles[variant]}`}>
        <Image src={good.image} alt={good.name} className={styles.image} fill />
      </div>

      <div className={styles.infoBlock}>
        <h2 className={styles.infoBlock_name}>{good.name}</h2>

        <div className={styles.infoBlock_price}>
          {good.price.value} {good.price.currency}
        </div>

        <div className={styles.infoBlock_stats}>
          <span className={styles.infoBlock_stats_likes}>
            <svg width="16" height="16" className={styles.icons}>
              <use href={`/sprite.svg#${starIconName}`} />
            </svg>
            {avgRate}
          </span>
          <span className={styles.infoBlock_stats_reviews}>
            <svg width="16" height="16" className={styles.icons}>
              <use href="/sprite.svg#comment" />
            </svg>
            {reviewsCount}
          </span>
        </div>

        <Link
          href={`/goods/${good._id}`}
          className={`${styles.detailsLink} btn`}>
          Детальніше
        </Link>
      </div>
    </>
  );
}
