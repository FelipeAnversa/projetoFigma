import { Stack , Box , Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTransacoes } from '../visual/services/delete/deleteTransacoes';

export default function Tabela({ rowsFiltradas, paginaAtual, limite, setRows, setValorEntradas, setValorSaidas, setValorTotal }) {
    function formatarData(dataString) {
        const [dataPart] = dataString.split(' ');
        const [ano, mes, dia] = dataPart.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function formatarValor(valor) {
        if (typeof valor === 'number') {
            return valor.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
        }
        return valor;
    }

    function adicionarSinal(valor, tipo) {
        const valorFormatado = formatarValor(valor);
        return tipo === 'entrada' ? `+ ${valorFormatado}` : `- ${valorFormatado}`;
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack
                component={Paper}
                elevation={0}
                sx={{
                    gap: '10px',
                    p: 2,
                    backgroundColor: 'transparent' 
                }}
            >
                {rowsFiltradas.map((row) => (
                    <Stack
                        key={row.id}
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        sx={{
                            padding: '15px',
                            backgroundColor: 'grey.300', 
                            borderRadius: '8px',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography 
                            sx={{ 
                                width: { xs: '100%', md: '30%' }, 
                                fontWeight: 500,
                                color: 'grey.600' 
                            }}
                        >
                            {row.nome}
                        </Typography>
                        <Typography 
                            sx={{ 
                                width: { xs: '100%', md: '20%' }, 
                                color: row.tipo === 'entrada' ? 'success.main' : 'error.main',
                                fontWeight: 'bold'
                            }}
                        >
                            {adicionarSinal(row.valor, row.tipo)}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ 
                                width: { xs: '100%', md: '40%' },
                                justifyContent: { xs: 'space-between', md: 'space-around' },
                                color: 'grey.600'
                            }}
                        >
                            <Box sx={{ minWidth: '80px' }}>{row.categoria}</Box>
                            <Box>{formatarData(row.data)}</Box>
                        </Stack>
                        <Box 
                            sx={{ 
                                width: { xs: '100%', md: '5%' }, 
                                display: 'flex', 
                                justifyContent: { xs: 'flex-end', md: 'center' } 
                            }}
                        >
                            <DeleteIcon 
                                sx={{ 
                                    color: 'error.light', 
                                    cursor: 'pointer',
                                    '&:hover': { color: 'error.main' }
                                }} 
                                onClick={() => deleteTransacoes(
                                    row.id, paginaAtual, limite, setRows, 
                                    setValorEntradas, setValorSaidas, setValorTotal
                                )}
                            />
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </ThemeProvider>
    );
}