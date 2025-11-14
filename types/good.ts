import { Feedback } from './feedback';
import { GENDER } from '@/constants/gender';
import { CURRENCIES } from '@/constants/currency';



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
    currency: (typeof CURRENCIES)[number];
  };
  size: string[];
  gender: (typeof GENDER)[number];
  description?: string;
  prevDescription?: string;
  feedbacks?: Feedback[];
  characteristics?: string[];
};
