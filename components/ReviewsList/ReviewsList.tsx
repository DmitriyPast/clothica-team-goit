import { fetchFeedbacks } from '@/lib/api/serverApi';
import ReviewsSlider from './ReviewsSlider';

interface ReviewsListProps {
  productId?: string;
}

export default async function ReviewsList({ productId }: ReviewsListProps) {
  const data = await fetchFeedbacks({
    productId: productId || '',
    page: 1,
    perPage: 10,
    sortBy: 'date',
    sortOrder: 'desc',
  });
  // console.log(data);

  const feedbacks = data.feedbacks || [];

  if (!feedbacks.length) {
    return <p>Відгуків ще немає</p>;
  }

  // Тут ми передаємо відгуки клієнтському компоненту
  return <ReviewsSlider feedbacks={feedbacks} productId={productId} />;
  return <p>'this is a dud'</p>;
}
