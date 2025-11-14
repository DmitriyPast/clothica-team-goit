'use client';

import css from './GoodPage.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById, fetchFeedbacks } from '@/lib/api/clientApi';
import { FetchFeedbacksResponse } from '@/lib/api/serverApi';

import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import Feedbacks from '@/components/Feedbacks/Feedbacks';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { goodId } = useParams<{ goodId: string }>();

  const { data: good } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
    refetchOnMount: false,
  });

  const { data: feedbacks } = useQuery<FetchFeedbacksResponse>({
    queryKey: ['good', goodId],
    queryFn: () => fetchFeedbacks({ productId: goodId }),
    refetchOnMount: false,
  });

  if (!good) return <p>Завантаження товару...</p>;
  if (!feedbacks) return <p>Завантаження відгуків...</p>;

  const {
    image,
    prevDescription,
    name,
    price,
    description,
    size,
    characteristics,
  } = good;

  return (
    <section>
      <div className="container">
        <GoodForPurchase
          image={image}
          prevDescription={prevDescription}
          name={name}
          price={price}
          description={description}
          size={size}
          characteristics={characteristics}
        />
        <Feedbacks feedbacks={feedbacks.feedbacks} />
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
