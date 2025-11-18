'use client';

import css from './GoodPage.module.css';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchGoodById, fetchFeedbacks } from '@/lib/api/clientApi';
import { FetchFeedbacksResponse } from '@/lib/api/serverApi';
import { Feedback } from '@/types/feedback';
import ReviewsSlider from '@/components/ReviewsList/ReviewsSlider';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import AddFeedbackModal from '@/components/AddFeedbackModal/AddFeedbackModal';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';

// import Feedbacks from '@/components/Feedbacks/Feedbacks';
import { useMemo } from 'react';

import Loading from '@/app/loading';

export default function GoodPageClient() {
  const { goodId } = useParams<{ goodId: string }>();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: good } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId),
    refetchOnMount: false,
    placeholderData: prev => prev,
  });

  // const { data: feedbacksData } = useQuery<FetchFeedbacksResponse>({
  //   queryKey: ['feedbacks', goodId],
  //   queryFn: () => fetchFeedbacks({ productId: goodId }),
  //   refetchOnMount: false,
  //   placeholderData: prev => prev,
  // });

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
        <div className={css.review_wrapper}>
          <div className={css.leave_feedback_wrapper}>
            <h2 className={css.feedbacks_title}>Відгуки клієнтів</h2>
            <button
              type="button"
              className={css.add_feedback}
              onClick={() => setModalOpen(!modalOpen)}>
              Залишити відгук
            </button>
          </div>
          {!feedbacks || feedbacks.length === 0 ? (
            <MessageNoInfo
              onClick={() => setModalOpen(!modalOpen)}
              text="У цього товару ще немає відгуків"
              buttonText="Залишити відгук"
            />
          ) : (
            <ReviewsSlider feedbacks={feedbacks ?? []} productId={goodId} />
          )}
        </div>
        {modalOpen && (
          <AddFeedbackModal
            onClose={() => setModalOpen(!modalOpen)}
            id={goodId}
          />
        )}
      </div>
    </section>
  );
}
