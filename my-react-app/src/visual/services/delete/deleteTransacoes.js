import api from '../../../apis/api';
import { getTransacoes } from '../get/getTransacoes';

export async function deleteTransacoes(id, paginaAtual, limite, setRows, setValorEntradas, setValorSaidas, setValorTotal) {
    try {
        const response = await api.delete(`/api/transacoes/${id}`);
        getTransacoes(paginaAtual, limite).then(data => setRows(data.transacoes || []));
        const GMDS = await getTransacoes(paginaAtual, limite);
        if (GMDS && GMDS.error !== true) {
            setValorEntradas(GMDS.resumo?.entradas || 0);
            setValorSaidas(GMDS.resumo?.saidas || 0);
            setValorTotal(GMDS.resumo?.total || 0);
        }
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}