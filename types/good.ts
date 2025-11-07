import { Feedback } from './feedback';

export type Good = {
  name: string;
  category: string;
  image: string;
  price: { value: number; currency: string };
  size: [string];
  description: string;
  feedbacks: [Feedback];
};
