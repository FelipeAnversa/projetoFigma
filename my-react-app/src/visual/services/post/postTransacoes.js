import api from '../../../apis/api';

export async function postTransacoes(nome, valor, categoria, tipo) {
    try {
        const response = await api.post('/api/transacoes', {
            "nome": nome,
            "valor": valor,
            "categoria": categoria,
            "tipo": tipo
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}