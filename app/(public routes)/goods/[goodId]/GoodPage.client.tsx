'use client';

import css from './GoodPage.module.css';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById } from '@/lib/api/clientApi';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchGoodById(id),
    refetchOnMount: false,
  });

  return (
    <section>
      <div className="container">
        test
        <Image
          src="https://ichef.bbci.co.uk/images/ic/1920xn/p0hpljtw.jpg"
          alt="space"
          width="335"
          height="370"
        />
      </div>
    </section>
  );
}
