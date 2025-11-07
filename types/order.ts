import { SIZES } from '@/constants/size';

export type Order = {
  userId: string;
  items: [
    {
      goodId: string;
      quantity: number;
      size: (typeof SIZES)[number];
    },
  ];
};
