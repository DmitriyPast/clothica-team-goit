import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://clothica-api-team-work.onrender.com/api',
  withCredentials: true,
});
