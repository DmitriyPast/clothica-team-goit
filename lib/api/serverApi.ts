import type { User } from '@/types/user';
import internalApi from './api';
import { cookies } from 'next/headers';
import { Gender, Good, Size } from '@/types/good';

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
