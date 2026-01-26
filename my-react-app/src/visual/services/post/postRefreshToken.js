import api from '../../../apis/api';

export async function postRefreshToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token não encontrado');
        }
        
        const response = await api.post('/api/refresh-token', { 
            refreshToken 
        });
        const { token: newToken } = response.data;
        localStorage.setItem('token', newToken);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        throw error;
    }
}