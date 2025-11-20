import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchGoodById, fetchFeedbacks } from '@/lib/api/serverApi';
import GoodPageClient from './GoodPage.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ goodId: string }>;
};

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { goodId } = await params;
  const good = await fetchGoodById(goodId);

  return {
    title: `Good: ${good.name}`,
    description: good.prevDescription?.slice(0, 30),
    openGraph: {
      title: `Good: ${good.name}`,
      description: good.prevDescription?.slice(0, 100),
      url: `https://clothica-team-goit-p9hv.vercel.app/goods/${goodId}`,
      siteName: 'Clothica',
      images: [
        {
          url: good.image,
          width: 1200,
          height: 630,
          alt: good.prevDescription,
        },
      ],
      type: 'article',
    },
  };
}

// --- PAGE COMPONENT ---
export default async function GoodPage({ params }: Props) {
  const { goodId } = await params;

  const queryClient = new QueryClient();

  // Prefetch good data
  await queryClient.prefetchQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
  });

  // Prefetch feedbacks
  await queryClient.prefetchQuery({
    queryKey: ['feedbacks', goodId],
    queryFn: () => fetchFeedbacks({ productId: goodId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodPageClient />
    </HydrationBoundary>
  );
}
