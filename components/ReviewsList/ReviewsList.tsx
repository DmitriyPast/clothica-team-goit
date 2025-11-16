'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchFeedbacks } from '@/lib/api/clientApi'; // ✅ Змінено на clientApi
import css from './ReviewsList.module.css';

type Props = {
  productId: string;
};

export default function ReviewsList({ productId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['feedbacks', productId],
    queryFn: () => fetchFeedbacks({ productId }),
  });

  if (isLoading) return <p>Завантаження відгуків...</p>;
  if (error) return <p>Помилка завантаження відгуків</p>;

  return (
    <div className={css.reviews}>
      <h3>Відгуки</h3>
      {data?.feedbacks.map(feedback => (
        <div key={feedback._id} className={css.review}>
          <p>
            <strong>{feedback.author}</strong> - {feedback.rate}/5
          </p>
          <p>{feedback.description}</p>
        </div>
      ))}
    </div>
  );
}
