import { Stack, Box, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormatacao } from '../hooks/useFormatacao';

export default function Tabela({ rowsFiltradas, carregarDados, excluirTransacao }) {  
    const { formatarMoeda, formatarData } = useFormatacao();
    const handleDelete = async (id) => {
        excluirTransacao(id);
        carregarDados(); 
    };

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
                                color: row.tipo === 'entrada' ? 'primary.light' : 'error.main', 
                                fontWeight: 'bold' 
                            }}
                        >
                            {row.tipo === 'entrada' ? '+' : '-'} {formatarMoeda(row.valor)}
                        </Typography>
                        <Stack 
                            direction="row" 
                            spacing={2} 
                            sx={{ 
                                width: { xs: '100%', md: '40%' }, 
                                justifyContent: { xs: 'space-between', md: 'space-around' }, 
                                color: { xs: 'grey.400', md: 'grey.600' } 
                            }}
                        >
                            <Box 
                                sx={{ 
                                    minWidth: '80px' 
                                }}
                            >{row.categoria}</Box>
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
                                onClick={() => handleDelete(row.id)}
                            />
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </ThemeProvider>
    );
}