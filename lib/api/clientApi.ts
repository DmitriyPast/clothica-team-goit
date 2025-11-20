import { Gender, Good, Size } from '@/types/good';
import internalApi from './api';
import type { User, RegisterUser, LoginUser } from '@/types/user';
import { Order, UpdateOrderStatus } from '@/types/order';
import { Category } from '@/types/category';
import { Feedback } from '@/types/feedback';
// import { GENDERS } from '@/constants/gender';
// import { SIZES } from '@/constants/size';
import { AxiosError } from 'axios'; // ✅ ЩОЙНО ДОДАВ: для типізації помилок

// ✅ ЩОЙНО ДОДАВ: Експорт типів для використання в інших файлах
export type ApiError<T = { message?: string; error?: string }> = AxiosError<T>;
export type { Category, Size, Good };

// ✅ ЩОЙНО ДОДАВ: Enums для сортування (щоб не писати 'price.value' вручну)
export enum SortBy {
  Date = 'createdAt',
  Price = 'price.value',
  Name = 'name',
}

// ✅ ЩОЙНО ДОДАВ: Enums для напрямку сортування
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface FetchGoodsResponse {
  goods: Good[];
  totalPages: number;
  totalGoods: number;
  page: number;
  perPage: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FetchGoodsParams {
  page?: number;
  perPage?: number;
  category?: string;
  size?: Size;
  gender?: Gender;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

//GET goods
export async function fetchGoods(
  params: FetchGoodsParams
): Promise<FetchGoodsResponse> {
  const { data } = await internalApi.get<FetchGoodsResponse>('/goods', {
    params,
  });
  return data;
}

//GET good by id
export async function fetchGoodById(goodId: string): Promise<Good> {
  const { data } = await internalApi.get<Good>(`/goods/${goodId}`);
  return data;
}

export interface FetchOrdersResponse {
  page: number;
  perPage: number;
  totalOrders: number;
  totalPages: number;
  orders: Order[];
}
export interface FetchOrdersParams {
  page?: number;
  perPage?: number;
}

//GET fetch all orders
export async function fetchAllOrders(
  params?: FetchOrdersParams
): Promise<FetchOrdersResponse> {
  return (await internalApi.get<FetchOrdersResponse>('/orders', { params }))
    .data;
}

//GET fetch order by id
export async function fetchOrderById(orderId: string) {
  return (await internalApi.get<Order>(`/orders/${orderId}`)).data;
}

//POST create order
export async function createOrder(order: Order): Promise<Order> {
  const { data } = await internalApi.post<Order>('/orders', order);
  return data;
}

//PATCH update order status(admin)
export async function updateOrderStatus(
  orderId: string,
  data: UpdateOrderStatus
): Promise<Order> {
  return (await internalApi.patch<Order>(`/orders/${orderId}/status`, data))
    .data;
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
  categories: Category[];
}

//GET categories - ✅ ВИПРАВЛЕНО: додано слеш на початку
export async function fetchCategories(
  params: FetchCategoriesParams
): Promise<FetchCategoriesResponse> {
  return (
    await internalApi.get<FetchCategoriesResponse>('/categories', { params })
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

/// --- GET feedbacks ---
export async function fetchFeedbacks(
  params: FetchFeedbacksParams
): Promise<FetchFeedbacksResponse> {
  return (
    await internalApi.get<FetchFeedbacksResponse>('/feedbacks', { params })
  ).data;
}

// --- POST feedback ---

// export type NewFeedback = Omit<Feedback, '_id' | 'date'> & {
//   date?: string;
// };

// export async function createFeedback(feedback: Feedback): Promise<Feedback> {
//   return (await internalApi.post<Feedback>('/feedbacks', feedback)).data;
// }

export type NewFeedback = {
  author: string;
  description: string;
  rate: number;
  productId: string;
};

export async function createFeedback(feedback: NewFeedback): Promise<Feedback> {
  return (await internalApi.post<Feedback>('/feedbacks', feedback)).data;
}

interface AddSubscriptionParams {
  email: string;
}

//POST subscription
export async function addSubscription(params: AddSubscriptionParams) {
  await internalApi.post('/subscriptions', params);
}

//register user
export type RegisterResponse = {
  message: string;
  user: User;
};

export async function registerUser(data: RegisterUser): Promise<RegisterResponse> {
  try {
    const {data: responseData} = await internalApi.post<RegisterResponse>('/auth/register', data);
    return responseData;
  } catch (error) {
    throw new Error('Registration failed');
  }
}

// Login user
export type LoginResponse = {
  message: string;
  user: User;
};
export async function loginUser(data: LoginUser): Promise<LoginResponse> {
  const { data: responseData } = await internalApi.post<LoginResponse>(
    '/auth/login',
    data
  );
  return responseData;
}

// Logout user
export async function logoutUser(): Promise<void> {
  await internalApi.post('/auth/logout');
}

export type CheckSessionResponse = {
  success: boolean;
};

// Check user session
export async function checkSession(): Promise<boolean> {
  const { data } = await internalApi.get<CheckSessionResponse>('/auth/session');
  return data.success;
}

// get current user
export async function getMe(): Promise<User | null> {
  try {
    const { data } = await internalApi.get<User>('/users/me');
    return data;
  } catch (error) {
    console.error('Get me error:', error);
    return null;
  }
}

export type UpdateUserRequest = {
  userName?: string;
  userSurname?: string;
  phone?: string;
  city?: string;
  postNumber?: string;
};

// update user
export async function updateMe(data: UpdateUserRequest): Promise<User> {
  const { data: requestData } = await internalApi.patch<User>(
    '/users/me',
    data
  );
  return requestData;
}
