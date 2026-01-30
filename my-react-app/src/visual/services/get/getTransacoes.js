import api from '../../../apis/api';

export async function getTransacoes(paginaAtual, limite) {
    try {
        const response = await api.get('/api/transacoes', {
            params: {
                pagina: paginaAtual,
                limite: limite
            }
        });
        console.log('Dados da página', paginaAtual, ':', response.data);
        return {
            success: true,
            transacoes: response.data?.transacoes || [],
            paginacao: response.data?.paginacao || {
                paginaAtual: paginaAtual,
                limite: limite,
                total: 0,
                totalPaginas: 0,
                temProxima: false,
                temAnterior: false
            }
        };
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        return { 
            success: false,
            error: error.message,
            transacoes: [],
            paginacao: null
        };
    }
}