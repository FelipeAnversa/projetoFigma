import api from '../../../apis/api';
import { getTransacoes } from '../get/getTransacoes';

export async function deleteTransacoes(id, valor, tipo, setRows, setValorEntradas, setValorSaidas) {
    try {
        if (tipo === 'entrada') {
            setValorEntradas(prev => prev - valor);
        } else if (tipo === 'saida') {
            setValorSaidas(prev => prev - valor);
        }
        const response = await api.delete(`/api/transacoes/${id}`);
        getTransacoes().then(updatedRows => setRows(updatedRows));
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}