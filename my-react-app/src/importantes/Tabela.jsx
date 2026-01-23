import { Stack , Box , Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTransacoes } from '../visual/services/delete/deleteTransacoes';
import { useMemo } from 'react';

export default function Tabela({ rowsFiltradas , itemsPorPagina , paginaAtual , setRows , setValorEntradas , setValorSaidas , setValorTotal }) {
    function formatarData(dataString) {
        const [dataPart] = dataString.split(' ');
        return dataPart.replace(/-/g, '/');
    }
    function formatarValor(valor, tipo) {
        if (tipo === 'saida') {
            return `R$ - ${Math.abs(valor).toFixed(2)}`;
        }
        return `R$ ${valor.toFixed(2)}`;
    }


    
    const dadosPaginaAtual = useMemo(() => {
        const startIndex = (paginaAtual - 1) * itemsPorPagina;
        //console.log("Start Index:", startIndex);
        const endIndex = startIndex + itemsPorPagina;
        //console.log("End Index:", endIndex);
        let arrayParaPaginacao = null;
        if (rowsFiltradas && Array.isArray(rowsFiltradas)) {
            arrayParaPaginacao = rowsFiltradas;
        } else if (Array.isArray(rowsFiltradas)) {
            arrayParaPaginacao = rowsFiltradas;
        }
        if (!arrayParaPaginacao) {
            console.error("rowsFiltradas não tem formato esperado:", rowsFiltradas);
            return [];
        }
        console.log("Array para paginação:", arrayParaPaginacao);
        console.log(arrayParaPaginacao.slice(startIndex, endIndex));
        return arrayParaPaginacao.slice(startIndex, endIndex);
    }, [rowsFiltradas, paginaAtual, itemsPorPagina]);

    return (
        <ThemeProvider theme={theme}>
            <Stack
                component={Paper}
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    display: 'flex',
                    gap: '10px'
                }}
                >
                {dadosPaginaAtual.map((row) => (
                    <Stack
                        key={row.id}
                        direction="row"
                        sx={{ 
                            padding: '15px',
                            backgroundColor: 'grey.300',
                            borderRadius: '4px',
                            borderBottom: '1px solid',
                            borderColor: 'grey.300',
                            alignItems: 'center',
                            
                        }}
                    >
                        <Box sx={{ width: '40%', color: 'grey.600' }} align='left'>
                            {row.nome}
                        </Box>
                        <Box 
                            sx={{ 
                                width: '20%', 
                                color: row.tipo === 'entrada' ? 'success.main' : 'error.main' 
                            }}
                        >{formatarValor(row.valor, row.tipo)}
                        </Box>
                        <Box sx={{ width: '25%', color: 'grey.600' }} align='center'>
                            {row.categoria}
                        </Box>
                        <Box sx={{ width: '15%', color: 'grey.600' }} align='center'>
                            {formatarData(row.data)}
                        </Box>
                        <DeleteIcon sx={{ color: 'error.main', marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteTransacoes(row.id, setRows, setValorEntradas, setValorSaidas, setValorTotal)}/>
                    </Stack>
                ))}
                </Stack>
        </ThemeProvider>
    );
}