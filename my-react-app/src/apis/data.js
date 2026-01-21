import api from './api.js';

let dadosExportados = [];
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
        dadosExportados = converterParaArray(response.data?.transacoes).map(item => ({
            id: item.id,
            usuario_id: item.usuario_id,
            nome: item.nome,
            valor: item.valor,
            categoria: item.categoria,
            tipo: item.tipo,
            data: item.data
        }));
        return dadosExportados;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        dadosExportados = [];
        throw error;
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