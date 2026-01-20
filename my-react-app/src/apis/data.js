import api from './api.js';

let dadosExportados = [];

const inicializarDados = async () => {
    try {
        const response = await api.get('/api/transacoes');
        dadosExportados = response.data.transacoes.map(item => ({
            id: item.id,
            usuario_id: item.usuario_id,
            nome: item.nome,
            valor: item.valor / 100,
            categoria: item.categoria,
            tipo: item.tipo,
            data: item.data
        }));
        
        console.log(dadosExportados);
    } catch (error) {
        console.error(error);
        dadosExportados = [];
    }
};
inicializarDados();
export const data = dadosExportados;
export const recarregarDados = async () => {
    await inicializarDados();
    return dadosExportados;
};
