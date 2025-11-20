import axios from 'axios';

export const api = axios.create({
  baseURL:'http://localhost:3030/api',
  // baseURL: 'https://clothica-api-team-work.onrender.com/api',
  withCredentials: true,
});
