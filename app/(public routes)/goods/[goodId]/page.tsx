import css from './GoodPage.module.css';

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchGoodById } from '@/lib/api/serverApi';
import GoodPageClient from './GoodPage.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GoodPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchGoodById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodPageClient />
    </HydrationBoundary>
  );
}
