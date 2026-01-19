import api from '../../../apis/api';

export async function postLogin(login, senha) {
    try {
        const response = await api.post('/api/login', {
            "login": login,
            "senha": senha
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}