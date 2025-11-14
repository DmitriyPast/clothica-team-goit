import { SIZES } from '@/constants/size';
import { Feedback } from './feedback';
import { GENDERS } from '@/constants/gender';
import { CURRENCIES } from '@/constants/currency';

// export type Good = {
//   goodId: string;
//   name: string;
//   category: string;
//   image: string;
//   price: { value: number; currency: string };
//   size: typeof SIZES[number];
//   description?: string;
//   feedbacks?: [Feedback];
//   prevDescription?: string;
//   gender: typeof GENDERS[number];
//   characteristics: string;
//   };

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
    currency: Currency;
  };
  size: Size[]; // масив
  gender: Gender;
  description?: string;
  prevDescription?: string;
  feedbacks?: Feedback[];
  characteristics?: string[]; // масив
};

export type Currency = (typeof CURRENCIES)[number];
export type Size = (typeof SIZES)[number];
export type Gender = (typeof GENDERS)[number];
