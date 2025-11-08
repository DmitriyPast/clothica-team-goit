import { CURRENCIES } from '@/constants/currency';
import { GENDERS } from '@/constants/gender';
import { ORDER_STATUSES } from '@/constants/order_status';
import { SIZES } from '@/constants/size';

export type Order = {
  userId: string;
  orderNumber?: string;
  items: [
    {
      goodId: string;
      quantity: number;
      size?: (typeof SIZES)[number];
      gender?: (typeof GENDERS)[number];
    },
  ];
  deliveryCost?: {
    value: number;
    currency: (typeof CURRENCIES)[number];
  };
  totalPrice: {
    value: number;
    currency: (typeof CURRENCIES)[number];
  };
  status: (typeof ORDER_STATUSES)[number];
  shippingAddress: string;
  contactPhone: string;
  comment?: string;
};

export type UpdateOrderStatus = {
  status: (typeof ORDER_STATUSES)[number];
};
