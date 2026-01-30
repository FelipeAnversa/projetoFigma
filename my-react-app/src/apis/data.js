import api from './api.js';

let promessaCarregamento = null;

const converterParaArray = (dados) => {
    if (!dados) return [];
    if (Array.isArray(dados)) return dados;
    if (typeof dados === 'object') return Object.values(dados);
    return [];
};

const inicializarDados = async () => {
    try {
        const response = await api.get('/api/transacoes');
        const transacoes = response.data?.transacoes || [];
        const transacoesProcessadas = converterParaArray(transacoes).map(item => ({
            id: item.id,
            usuario_id: item.usuario_id,
            nome: item.nome,
            valor: item.valor,
            categoria: item.categoria,
            tipo: item.tipo,
            data: item.data
        }));
        return {
            transacoes: transacoesProcessadas,
            paginacao: response.data?.paginacao
        };
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        dadosExportados = [];
        return {
            transacoes: [],
            paginacao: {
                paginaAtual: 1,
                limite: 10,
                total: 0,
                totalPaginas: 0,
                temProxima: false,
                temAnterior: false
            }
        };
    }
};

const carregarDados = async () => {
    if (!promessaCarregamento) {
        promessaCarregamento = inicializarDados();
    }
    return promessaCarregamento;
};

carregarDados();

export const data = async () => {
    return await carregarDados();
};

export const recarregarDados = async () => {
    promessaCarregamento = null;
    return await carregarDados();
};