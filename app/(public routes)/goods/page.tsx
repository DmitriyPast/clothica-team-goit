import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import GoodsClient from './Goods.client';
import { fetchGoods } from '@/lib/api/clientApi';

export default async function GoodsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['goods', { page: 1, perPage: 8, category: 'all' }],
    queryFn: () => fetchGoods({ page: 1, perPage: 8, category: 'all' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodsClient />
    </HydrationBoundary>
  );
}
