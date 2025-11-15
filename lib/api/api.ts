import axios, { AxiosError } from 'axios';

export type ApiError<T = { message?: string; error?: string }> = AxiosError<T>;
const env = process.env.NEXT_PUBLIC_API_URL;
let baseURL = env ? env + '/api' : 'http://localhost:3000/api';
const isProd = process.env.NODE_ENV === 'production';
if (isProd) baseURL = 'https://clothica-team-goit-p9hv.vercel.app/api'; //Vercel is stupid but it's now working

const internalApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default internalApi;

