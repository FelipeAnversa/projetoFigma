import api from '../../../apis/api';

export async function paginacaoAPI() {
    try {
        const response = await api.get('/api/transacoes');
        const paginacaoData = response.data?.paginacao ? {
            paginaAtual: response.data.paginacao.paginaAtual,
            limite: response.data.paginacao.limite,
            total: response.data.paginacao.total,
            totalPaginas: response.data.paginacao.totalPaginas,
            temProxima: response.data.paginacao.temProxima,
            temAnterior: response.data.paginacao.temAnterior
        } : null;
        return paginacaoData;
    } catch (error) {
        return { 
            error: error.message,
            paginacao: null
        };
    }
}