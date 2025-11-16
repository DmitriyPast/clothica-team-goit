import css from './GoodPage.module.css';

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchGoodById, fetchFeedbacks } from '@/lib/api/serverApi';
import GoodPageClient from './GoodPage.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GoodPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['good', id],
    queryFn: () => fetchGoodById(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['feedbacks', id],
    queryFn: () => fetchFeedbacks({ productId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodPageClient />
    </HydrationBoundary>
  );
}
