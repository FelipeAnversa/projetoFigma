import api from '../../../apis/api';

export async function postLogin(login, senha) {
    try {
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        const response = await api.post('/api/login', {
            login: login,
            senha: senha
        });
        console.log('Login realizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro no login:', error);
        return { 
            error: error.message,
            status: error.response?.status,
            data: error.response?.data 
        };
    }
}
export async function postRefreshToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token não encontrado');
        }
        const response = await api.post('/api/refresh-token', {
            refreshToken: refreshToken
        });
        const { token, newRefreshToken } = response.data;
        localStorage.setItem('token', token);
        if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
        }
        console.log('Token atualizado com sucesso');
        return token;   
    } catch (error) {
        console.error('Erro ao atualizar token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        throw error;
    }
}