export type User = {
  name: string;
  surName?: string;
  phone: string;
  email?: string;
  avatar?: string;
  status: 'User' | 'Admin';
};

export type RegisterUser = {
  name: string;
  phone: string;
  password: string;
};

export type LoginUser = {
  phone: string;
  password: string;
};
