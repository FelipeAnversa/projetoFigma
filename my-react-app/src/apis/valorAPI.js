import api from './api.js';

export async function valorAPI() {
    try {
        const response = await api.get('/api/transacoes/');
        const valorData = response.data?.resumo ? {
            total: response.data.resumo.total,
            entradas: response.data.resumo.entradas,
            saidas: response.data.resumo.saidas
        } : null;
        return valorData;
    } catch (error) {
        return { error: error.message };
    }
}