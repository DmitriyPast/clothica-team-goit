export type User = {
  username: string;
  email: string;
  avatar: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  name?: string;
};