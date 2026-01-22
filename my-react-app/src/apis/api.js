import axios from 'axios';

const api = axios.create({
    baseURL: 'http://72.60.54.143:3000/',
    timeout: 10000,
});

const TOKEN_FIXO = localStorage.getItem('token');

try {
    const response = api.get('/api/refresh-token', {
        headers: {
            Authorization: `Bearer ${TOKEN_FIXO}`,
        },
    });
    const novoToken = response.data.token;
    localStorage.setItem('token', novoToken);
} catch (error) {
    console.error('Erro ao atualizar o token:', error);
}

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${TOKEN_FIXO}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;