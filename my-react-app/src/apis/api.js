import axios from 'axios';

const api = axios.create({
    baseURL: 'http://72.60.54.143:3000/',
    timeout: 10000,
});

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
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Erro 401: Não autorizado. Possível token inválido ou expirado.');
            const originalRequest = error.config;
            const refreshToken = localStorage.getItem('refreshToken');
            if (!originalRequest._retry && refreshToken) {
                originalRequest._retry = true;
                try {
                    const refreshResponse = await axios.post('http://72.60.54.143:3000/api/refresh-token', { refreshToken });
                    if (refreshResponse.data.token) {
                        localStorage.setItem('token', refreshResponse.data.token);
                        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Falha ao atualizar token:', refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;