import css from './GoodReviews.module.css';

import ReviewsSlider from '@/components/ReviewsList/ReviewsSlider';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import AddFeedbackModal from '@/components/AddFeedbackModal/AddFeedbackModal';
import { useState } from 'react';
import { Feedback } from '@/types/feedback';

interface GoodReviewsProps {
  goodId: string;
  feedbacks: Feedback[];
}

export default function GoodReviews({ goodId, feedbacks }: GoodReviewsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
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
      {modalOpen && (
        <AddFeedbackModal
          onClose={() => setModalOpen(!modalOpen)}
          id={goodId}
        />
      )}
    </div>
  );
}
