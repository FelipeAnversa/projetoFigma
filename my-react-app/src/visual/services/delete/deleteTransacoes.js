import api from '../../../apis/api';
import { valorAPI } from '../../../apis/valorAPI';
import { getTransacoes } from '../get/getTransacoes';

export async function deleteTransacoes(id, setRows, setValorEntradas, setValorSaidas, setValorTotal) {
    try {
        const response = await api.delete(`/api/transacoes/${id}`);
        getTransacoes().then(updatedRows => setRows(updatedRows));
        const valorData = await valorAPI();
        if (valorData && valorData.error !== true) {
            setValorEntradas(valorData?.entradas || 0);
            setValorSaidas(valorData?.saidas || 0);
            setValorTotal(valorData?.total || 0);
        }
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}