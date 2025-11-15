import { SIZES } from '@/constants/size';
import { Feedback } from './feedback';
import { GENDERS } from '@/constants/gender';

export type Good = {
  _id: string;
  name: string;
  image: string;
  category: {
    _id: string;
    name: string;
  };
  price: {
    value: number;
    currency: string;
  };
  size: Size[];
  gender: Gender;
  description?: string;
  prevDescription?: string;
  feedbacks?: Feedback[];
  characteristics?: string[];
};

export type Size = (typeof SIZES)[number];
export type Gender = (typeof GENDERS)[number];
