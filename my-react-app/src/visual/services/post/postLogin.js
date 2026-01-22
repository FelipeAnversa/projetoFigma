import api from '../../../apis/api';

export async function postLogin(login, senha) {
    try {
        const response = await api.post('/api/login', {
            login: login,
            senha: senha
        });
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        if (refreshToken) {
            try {
                const refreshResponse = await api.post('/api/refresh-token', {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });
                const novoToken = refreshResponse.data.token;
                localStorage.setItem('token', novoToken);
            } catch (error) {
                console.error('Erro ao atualizar o token:', error);
            }
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}