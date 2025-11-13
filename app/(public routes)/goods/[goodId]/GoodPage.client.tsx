'use client';

import css from './GoodPage.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById } from '@/lib/api/clientApi';

import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { goodId } = useParams<{ goodId: string }>();

  const { data: good } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
    refetchOnMount: false,
  });

  if (!good) return null;

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
      </div>
    </section>
  );
}
