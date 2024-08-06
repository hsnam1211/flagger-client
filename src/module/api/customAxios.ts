import axios, { AxiosInstance } from 'axios';

export const CustomAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: false,
});
