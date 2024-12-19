import axios from 'axios';
import { ERROR_CODES } from '@/constants/errorCode'
import { useAuthStore } from '@/stores/auth'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        ElMessage({
            message: '请求配置错误',
            type: 'error'
        });
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const { code, message, data } = response.data;

        // 成功请求
        if (code === ERROR_CODES.SUCCESS) {
            return data;
        }

        // token 相关错误
        if ([ERROR_CODES.TOKEN_EXPIRED,
        ERROR_CODES.INVALID_TOKEN,
        ERROR_CODES.OTHER_CLIENT_LOGIN].includes(code)) {
            const authStore = useAuthStore();
            authStore.handleTokenExpired();
            return Promise.reject(new Error('登录已过期'));
        }

        // 其他业务错误
        ElMessage({
            message: message || '请求失败',
            type: 'error',
            duration: 3000
        });
        return Promise.reject(new Error(message || '请求失败'));
    },
    error => {
        // 网络错误等
        const message = error.response?.data?.message || error.message || '网络错误';
        ElMessage({
            message,
            type: 'error',
            duration: 3000
        });
        return Promise.reject(error);
    }
);

export default service;