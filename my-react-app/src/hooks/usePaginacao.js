export function usePaginacao(totalPaginas, paginaAtual, setPaginaAtual) {
    const handleChange = (event, value) => {
        setPaginaAtual(value);
    };
    return { totalPaginas, paginaAtual, handleChange };
}