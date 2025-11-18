export type Feedback = {
  _id: string;
  userId?: string;
  author: string;
  date: string;
  description: string;
  rate: number;
  category?: string;
  productId?: {
    _id: string,
    name: string,
  };
};