import api from '../../../apis/api';

export async function postCriarConta(login, senha, data) {
    try {
        const response = await api.post('/api/criar-conta', {
            "login": login,
            "senha": senha,
            "criado-em": data
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}