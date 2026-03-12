import { useMemo } from 'react';

export function useFormatacao() {
    const formatarMoeda = useMemo(() => (valor) => {
        if (typeof valor !== 'number') return valor;
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }, []);
    const formatarData = useMemo(() => (dataString) => {
        if (!dataString) return '';
        const [dataPart] = dataString.split(' ');
        const [ano, mes, dia] = dataPart.split('-');
        return `${dia}/${mes}/${ano}`;
    }, []);
    return { formatarMoeda, formatarData };
}