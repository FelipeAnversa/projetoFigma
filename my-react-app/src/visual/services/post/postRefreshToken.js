import api from '../../../apis/api';

export async function postRefreshToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token não encontrado');
        }
        const response = await api.post('/api/refresh-token', { 
            refreshToken: refreshToken
        });
        if (!response.data || !response.data.token || !response.data.refreshToken) {
            throw new Error('Resposta de refresh token inválida');
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete api.defaults.headers.common['Authorization'];
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        throw error;
    }
}