import { useState, useEffect, useCallback } from 'react';
import { getTransacoes } from '../visual/services/get/getTransacoes';
import { postTransacoes } from '../visual/services/post/postTransacoes';
import { deleteTransacoes } from '../visual/services/delete/deleteTransacoes';

export function useFinanceiro(paginaAtual, limite) {
    const [dados, setDados] = useState({
        rows: [],
        resumo: { entradas: 0, saidas: 0, total: 0 },
        paginacao: { totalPaginas: 1 }
    });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const carregarDados = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const resultado = await getTransacoes(paginaAtual, limite);
            setDados({
                rows: resultado.transacoes || [],
                resumo: resultado.resumo || { entradas: 0, saidas: 0, total: 0 },
                paginacao: resultado.paginacao || { totalPaginas: 1 }
            });
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            setErro(err);
        } finally {
            setLoading(false);
        }
    }, [paginaAtual, limite]);
    const adicionarTransacao = async (dados) => {
        await postTransacoes(dados.descricao, parseFloat(dados.preco), dados.categoria, dados.tipoTransacao);
        await carregarDados();
    };
    const excluirTransacao = async (id) => {
        try {
            await deleteTransacoes(id);
            await carregarDados();
        } catch (err) {
            setErro("Erro ao excluir transação");
        }
    };
    useEffect(() => {
        carregarDados();
    }, [carregarDados]);
    return { ...dados, loading, erro, carregarDados, adicionarTransacao, excluirTransacao };
}