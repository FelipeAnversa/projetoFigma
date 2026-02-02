import axios from 'axios';

const api = axios.create({
    baseURL: 'http://72.60.54.143:3000/',
    timeout: 10000,
});

let isRefreshing = false;

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            if (originalRequest.url === '/api/refresh-token') {
                if (!isRefreshing) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
            const refreshToken = localStorage.getItem('refreshToken');
            if (!originalRequest._retry && refreshToken && !isRefreshing) {
                originalRequest._retry = true;
                isRefreshing = true;
                try {
                    const refreshResponse = await api.post('/api/refresh-token', { refreshToken });
                    if (refreshResponse.data.token) {
                        localStorage.setItem('token', refreshResponse.data.token);
                        if (refreshResponse.data.refreshToken) {
                            localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
                        }
                        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
                        isRefreshing = false;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Falha ao atualizar token:', refreshError);
                    isRefreshing = false;
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;