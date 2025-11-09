import { Gender, Good, Size } from '@/types/good';
import internalApi from './api';
import type { User, RegisterUser, LoginUser } from '@/types/user';
import { Order, UpdateOrderStatus } from '@/types/order';
import { Category } from '@/types/category';
import { Feedback } from '@/types/feedback';

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

//GET goods
export async function fetchGoods(
  params: FetchGoodsParams
): Promise<FetchGoodsResponse> {
  const { data } = await internalApi.get<FetchGoodsResponse>('goods', {
    params,
  });
  return data;
}

//GET good by id
export async function fetchGoodById(noteId: string): Promise<Good> {
  const { data } = await internalApi.get<Good>(`goods/${noteId}`);
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

//POST create order
export async function createOrder(order: Order): Promise<Order> {
  const { data } = await internalApi.post<Order>('orders', order);
  return data;
}

//PATCH update order status(admin)
export async function updateOrderStatus(
  orderId: string,
  data: UpdateOrderStatus
): Promise<Order> {
  return (await internalApi.patch<Order>(`orders/${orderId}/status`, data))
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

//POST feedback
export async function createFeedback(feedback: Feedback): Promise<Feedback> {
  return (await internalApi.post<Feedback>('feedbacks', feedback)).data;
}

interface AddSubscriptionParams {
  email: string;
}

//POST subscription
//я хз тому поки параметри у 2 місцях і без повернення значення бо я хз що повертати тут
export async function addSubscription(params: AddSubscriptionParams) {
  await internalApi.post('subscriptions', params, {
    params,
  });
}

//register user
export async function registerUser(data: RegisterUser): Promise<User | null> {
  try {
    const response = await internalApi.post<User>('/auth/register', data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

// Login user
export async function loginUser(data: LoginUser): Promise<User> {
  try {
    const { data: responseData } = await internalApi.post<User>(
      '/auth/login',
      data,
      {
        withCredentials: true,
      }
    );
    return responseData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
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
  name?: string;
  surName?: string;
  phone?: string;
  city?: string;
  postNumber?: number;
};

// update user
export async function updateMe(data: UpdateUserRequest): Promise<User> {
  try {
    const { data: requestData } = await internalApi.patch<User>(
      '/users/me',
      data
    );
    return requestData;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}
