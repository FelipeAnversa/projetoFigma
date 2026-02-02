import api from '../../../apis/api';

export async function getTransacoes(paginaAtual, limite) {
    try {
        if (!paginaAtual || !limite) {
            paginaAtual = 1;
            limite = 10;
        }
        const response = await api.get(`/api/transacoes?pagina=${paginaAtual}&limite=${limite}`);
        console.log('Dados recebidos da API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        return error;
    }
}