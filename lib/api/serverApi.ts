import type { User } from '@/types/user';
import internalApi from './api';
import { cookies } from 'next/headers';
import { Gender, Good, Size } from '@/types/good';
import { Order } from '@/types/order';
import { Feedback } from '@/types/feedback';
import { Category } from '@/types/category';

export interface FetchGoodsResponse {
  goods: Good[];
  totalPages: number;
  totalItems: number;
}

export interface FetchGoodsParams {
  page?: number;
  perPage?: number;
  size?: Size;
  gender?: Gender;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const res = await internalApi.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await internalApi.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// GET goods/products
export async function fetchGoodsServer(
  params: FetchGoodsParams
): Promise<FetchGoodsResponse> {
  const { data } = await internalApi.get<FetchGoodsResponse>('/goods', {
    params,
  });
  return data;
}

// GET good by id
export async function fetchGoodById(goodId: string): Promise<Good> {
  const { data } = await internalApi.get<Good>(`/goods/${goodId}`);
  return data;
}

export interface FetchOrdersResponse {
  orders: Order[];
}

//GET fetch all orders
export async function fetchAllOrders(): Promise<FetchOrdersResponse> {
  return (await internalApi.get<FetchOrdersResponse>('orders')).data;
}

//GET fetch order by id
export async function fetchOrderById(orderId: string) {
  return (await internalApi.get<Order>(`orders/${orderId}`)).data;
}

export interface FetchCategoriesParams {
  page?: number;
  perPage?: number;
}

export interface FetchCategoriesResponse {
  page: number;
  perPage: number;
  totalCategories: number;
  totalPages: number;
  catedories: Category[];
}

//GET categories
export async function fetchCategories(
  params: FetchCategoriesParams
): Promise<FetchCategoriesResponse> {
  return (
    await internalApi.get<FetchCategoriesResponse>('categories', { params })
  ).data;
}

export interface FetchFeedbacksParams {
  productId: string;
  page?: number;
  perPage?: number;
}

export interface FetchFeedbacksResponse {
  feedbacks: Feedback[];
  productId: string;
  totalFeedbacks: number;
  page: number;
  perPage: number;
  totalPages: number;
}

//GET feedbacks
export async function fetchFeedbacks(
  params: FetchFeedbacksParams
): Promise<FetchFeedbacksParams> {
  return (
    await internalApi.get<FetchFeedbacksResponse>('feedbacks', { params })
  ).data;
}
