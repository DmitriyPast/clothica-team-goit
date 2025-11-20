import Image from 'next/image';
import Link from 'next/link';
import { Good } from '@/types/good';
import styles from './GoodInfo.module.css';

type GoodInfoProps = {
  good: Good; // Good object received from the backend
  variant: 'popularGoods' | 'goodsPage';
};

export default function GoodInfo({ good, variant }: GoodInfoProps) {
  // Calculate number of likes (feedbacks with rating 4+)
  const likesCount = good.feedbacks?.filter(f => f.rate >= 4).length || 0;

  // Calculate total number of reviews
  const reviewsCount = good.feedbacks?.length || 0;

  const starIconName =
    likesCount === 1 ? 'star' : likesCount < 3 ? 'star_half' : 'star-filled';

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
            {likesCount}
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
