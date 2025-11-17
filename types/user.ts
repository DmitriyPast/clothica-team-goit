import { ROLE } from '@/constants/user_role';

export type User = {
  _id: string;
  username: string;
  userSurname?: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: typeof ROLE[number];
  city?: string;
  postNumber?: string;
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
