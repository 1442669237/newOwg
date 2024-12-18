import axios from 'axios';
// import { ElMessageBox, ElMessage } from 'element-plus'
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_URL, // 基础URL，可以在.env文件中配置
    timeout: 5000 // 请求超时时间
});
import { showNotify, showToast } from 'vant'
console.log(showNotify)
// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如添加token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 假设你的服务器返回的数据结构为{ code, message, data }
        if (res.code === 20000) {
            return res.data;
        } else if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // 登录状态失效等，需要重新登录
            ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page or log in again.', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token'); // 移除token
                location.reload(); // 重新加载页面
            }).catch(() => {
                console.log('cancel');
            });
            return Promise.reject(new Error('未登录，请登录'));
        } else {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error(res.message || 'Error'));
        }
    },
    error => {
        showNotify({ type: 'success', message: '通知内容' });

        showToast({
            message: 'This message will contain a incomprehensibilities long word.'
        })
        return Promise.reject(error);
    }
);

export default service;