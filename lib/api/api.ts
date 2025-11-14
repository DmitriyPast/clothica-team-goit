import axios, { AxiosError } from 'axios';

export type ApiError<T = { message?: string; error?: string }> = AxiosError<T>;

// ✅ Для клієнтських запитів - використовуємо локальний proxy
const baseURL = '/api';

const internalApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default internalApi;
