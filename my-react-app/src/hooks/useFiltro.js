import { useMemo } from 'react';

export function useFiltro(rows, buscaFiltrada) {
    const rowsFiltradas = useMemo(() => {
        const termo = buscaFiltrada?.toLowerCase() || "";
        return (rows || []).filter(row => 
            [row.nome, row.categoria, row.data].some(valor => 
                valor?.toLowerCase().includes(termo)
            )
        );
    }, [rows, buscaFiltrada]);
    return { rowsFiltradas };
}