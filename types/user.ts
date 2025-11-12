import { ROLE } from '@/constants/user_role';

export type User = {
  username: string;
  userSurname?: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: typeof ROLE;
  city?: string;
  postNumber?: number;
};

export type RegisterUser = {
  username: string;
  phone: string;
  password: string;
};

export type LoginUser = {
  phone: string;
  password: string;
};
