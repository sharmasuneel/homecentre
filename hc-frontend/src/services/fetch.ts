import axios from 'axios'
import { HOST } from '../config';

const axiosInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200)
      return response.data
  },
  (error) => {
    if (error.response) {
      console.error('API Error: ', error.response);
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const http = {
  get: (url: string, config = {}) => {
    return axiosInstance.get(url, config);
  },
  post: (url: string, data: any, config = {}) => {
    return axiosInstance.post(url, data, config);
  },
  put: (url: string, data: any, config = {}) => {
    return axiosInstance.put(url, data, config);
  },
  delete: (url: string, config = {}) => {
    return axiosInstance.delete(url, config);
  },
}

export default http