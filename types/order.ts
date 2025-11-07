import { SIZES } from '@/constants/size';

export type Order = {
  userId: string;
  items: [
    {
      priductId: string;
      quantity: number;
      size: (typeof SIZES)[number];
    },
  ];
};
