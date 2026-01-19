import api from '../../../apis/api';

export async function getTransacoes() {
    try {
        const response = await api.get('/api/transacoes');
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}