'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById } from '@/lib/api/clientApi';
import { Feedback } from '@/types/feedback';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import GoodReviews from '@/components/GoodReviews/GoodReviews';

// import Feedbacks from '@/components/Feedbacks/Feedbacks';
import { useMemo } from 'react';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { goodId } = useParams<{ goodId: string }>();

  const { data: good } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
    refetchOnMount: false,
    placeholderData: prev => prev,
  });

  function averageRate(feedbacks: Feedback[] | undefined): number {
    if (!feedbacks || feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, f) => acc + (f.rate ?? 0), 0);
    const avg = parseFloat((sum / feedbacks.length).toFixed(2));
    return avg;
  }

  const avg = useMemo(() => averageRate(good?.feedbacks), [good?.feedbacks]);

  if (!good) return <p>Завантаження товару...</p>;
  // if (!feedbacksData) return <p>Завантаження відгуків...</p>;

  const {
    _id: id,
    image,
    prevDescription,
    name,
    price,
    description,
    size,
    characteristics,
    feedbacks,
    category,
  } = good;

  return (
    <section>
      <div className="container">
        <GoodForPurchase
          id={id}
          image={image}
          prevDescription={prevDescription}
          name={name}
          price={price}
          description={description}
          size={size}
          characteristics={characteristics || []}
          rate={avg}
          feedbacksAmount={feedbacks?.length || 0}
          category={category}
        />
        <GoodReviews goodId={id} feedbacks={feedbacks ?? []} />
      </div>
    </section>
  );
}
