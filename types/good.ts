import { SIZES } from '@/constants/size';
import { Feedback } from './feedback';
import { GENDERS } from '@/constants/gender';

export type Good = {
  goodId: string;

  name: string;
  category: string;
  image: string;
  price: { value: number; currency: string };
  size: [Size];
  description?: string;
  feedbacks?: [Feedback];
  prevDescription?: string;
  gender: Gender;
  characteristics: string;
};

export type Size = (typeof SIZES)[number];
export type Gender = (typeof GENDERS)[number];
