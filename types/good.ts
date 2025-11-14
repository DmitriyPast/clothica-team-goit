import { SIZES } from '@/constants/size';
import { Feedback } from './feedback';
import { GENDERS } from '@/constants/gender';

export type Good = {
  goodId: string;
  name: string;
  category: string;
  image: string;
  price: { value: number; currency: string };
  size: string[];
  // розміри підтягуються з беку, якщо їх захардкодити через SIZES, тоді всі значення об'єднуються в одну строчку
  description?: string;
  feedbacks?: [Feedback];
  prevDescription?: string;
  gender: (typeof GENDERS)[number];
  characteristics: string[];
};
