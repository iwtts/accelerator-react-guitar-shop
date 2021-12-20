import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const REQUEST_TIMEOUT = 5000;

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => Promise.reject(error),
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => config,
  );

  return api;
};

export { createApi };
