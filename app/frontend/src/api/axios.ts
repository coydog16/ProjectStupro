import axios from 'axios';
import { API_BASE_URL, API_CONFIG, API_TIMEOUT } from './apiConfig';

// 共通のaxiosインスタンスを作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  ...API_CONFIG,
});

export default apiClient;
