import api from '../../../apis/api';

export async function postLogin(login, senha) {
    try {
        const response = await api.post('/api/login', { 
            "login": login,
            "senha": senha
        });
        if (!response.data.token || !response.data.refreshToken) {
            throw new Error('Resposta de login inválida');
        }
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    } catch (error) {
        console.error('Erro no login:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return { 
            error: error.message,
            status: error.response?.status,
            data: error.response?.data 
        };
    }
}