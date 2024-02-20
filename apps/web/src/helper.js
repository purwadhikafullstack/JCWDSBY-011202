import axios from 'axios';
export const API_CALL = axios.get({
  baseURL: import.meta.env.API_URL,
});
export const API_URL = import.meta.env.VITE_API_URL;

export const IMG_URL_PRODUCT = `${import.meta.env.VITE_IMAGE_URL}`;
