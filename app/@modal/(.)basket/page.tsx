import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import BasketModal from './BasketModal';
import { fetchGoodById } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PreviewPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['good', id],
    queryFn: () => fetchGoodById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BasketModal />
      </HydrationBoundary>
    </div>
  );
}
