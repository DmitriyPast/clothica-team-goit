'use client';

import css from './GoodPage.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById, fetchFeedbacks } from '@/lib/api/clientApi';
import { FetchFeedbacksResponse } from '@/lib/api/serverApi';
import { Feedback } from '@/types/feedback';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
// import Feedbacks from '@/components/Feedbacks/Feedbacks';
import { useMemo } from 'react';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { goodId } = useParams<{ goodId: string }>();

  const { data: good } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
    refetchOnMount: false,
  });

  const { data: feedbacksData } = useQuery<FetchFeedbacksResponse>({
    queryKey: ['feedbacks', goodId],
    queryFn: () => fetchFeedbacks({ productId: goodId }),
    refetchOnMount: false,
  });

  function averageRate(feedbacks: Feedback[] | undefined): number {
    if (!feedbacks || feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, f) => acc + (f.rate ?? 0), 0);
    return sum / feedbacks.length;
  }

  const avg = useMemo(
    () => averageRate(feedbacksData?.feedbacks),
    [feedbacksData?.feedbacks]
  );

  if (!good) return <p>Завантаження товару...</p>;
  if (!feedbacksData) return <p>Завантаження відгуків...</p>;

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
        />
        {/* {feedbacks.feedbacks.map(f => (
          <div key={f._id}>
            <h3>{f.rate}</h3>
            <h4>{f.author}</h4>
            <p>{f.description}</p>
          </div>
        ))}
        <div>{feedbacks?.feedbacks[0].description}</div> */}
      </div>
    </section>
  );
}
