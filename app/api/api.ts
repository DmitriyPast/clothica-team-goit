import axios from 'axios';

export const api = axios.create({
  //  baseURL: 'https://clothica-api-team-work.onrender.com/api',
   baseURL: 'http://localhost:3030/api',
  withCredentials: true,
});
