import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import GoodsClient from './Goods.client';
import { fetchGoods } from '@/lib/api/clientApi';

export default async function GoodsPage() {
  const queryClient = new QueryClient();

  // Налаштування дефолтних параметрів, які мають збігатися з useState у GoodsClient
  const initialParams = {
    page: 1,
    perPage: 8, // Дефолтне значення для сервера (мобільна версія)
    category: 'all',
    // size: [0], // ✅ ВАЖЛИВО: Додаємо порожній масив, щоб ключ збігався з клієнтом
    // !(ПОМИЛКА)
  };

  await queryClient.prefetchQuery({
    // Ключ має точно відповідати тому, що в useQuery у GoodsClient
    queryKey: ['goods', initialParams],
    queryFn: () => fetchGoods(initialParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodsClient />
    </HydrationBoundary>
  );
}
