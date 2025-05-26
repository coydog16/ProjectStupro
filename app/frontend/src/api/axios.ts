import axios from 'axios';
import { API_BASE_URL, API_CONFIG, API_TIMEOUT } from './apiConfig';

// 共通のaxiosインスタンスを作成
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    ...API_CONFIG,
});

// リクエストインターセプター

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // ←ここを修正
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
