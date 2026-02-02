import api from '../../../apis/api';

export async function deleteTransacoes(id) {
    try {
        const response = await api.delete(`/api/transacoes/${id}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}