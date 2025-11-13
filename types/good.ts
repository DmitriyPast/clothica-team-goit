import { SIZES } from '@/constants/size';
import { Feedback } from './feedback';
import { GENDERS } from '@/constants/gender';

export type Good = {
  goodId: string;
  name: string;
  category: string;
  image: string;
  price: { value: number; currency: string };
  size: (typeof SIZES)[number];
  description?: string;
  feedbacks?: [Feedback];
  prevDescription?: string;
  gender: (typeof GENDERS)[number];
  characteristics: string;
};
