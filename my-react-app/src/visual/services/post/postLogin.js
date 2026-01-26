import api from '../../../apis/api';

export async function postLogin(login, senha) {
    try {
        const response = await api.post('/api/login', { 
            login: login,
            senha: senha
        });
        if (!response.data) {
            throw new Error('Resposta de login inválida');
        }
        if (!response.data.token || !response.data.refreshToken) {
            throw new Error('Token ou refresh token não encontrados na resposta');
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
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