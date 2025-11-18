import { Feedback } from '@/types/feedback';

interface FeedbacksProps {
  feedbacks: Feedback[];
}

export default function Feedbacks({ feedbacks }: FeedbacksProps) {
  return (
    <div>
      {feedbacks.map(f => (
        <div key={f._id}>
          <h3>{f.rate}</h3>
          <h4>{f.author}</h4>
          <p>{f.description}</p>
        </div>
      ))}
    </div>
  );
}
