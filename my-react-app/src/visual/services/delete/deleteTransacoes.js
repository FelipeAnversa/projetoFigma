import api from '../../../apis/api';
import { getTransacoes } from '../get/getTransacoes';

export async function deleteTransacoes(id, setRows) {
    try {
        const response = await api.delete(`/api/transacoes/${id}`);
        getTransacoes().then(updatedRows => setRows(updatedRows));
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}