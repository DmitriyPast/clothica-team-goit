export type Feedback = {
  _id?: string;
  author: string;
  date: string;
  description: string;
  rate: number;
  category?: string;
  productId: string;
};
