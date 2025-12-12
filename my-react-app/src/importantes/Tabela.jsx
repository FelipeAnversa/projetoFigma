import { Stack , Box , Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export default function Tabela({ rowsFiltradas }) {
    return (
        <ThemeProvider theme={theme}>
            <Stack
                component={Paper}
                sx={{
                    
                    fontFamily: 'Roboto, sans-serif',
                    p: 2,
                    display: 'flex',
                    gap: '10px'
                }}
                >
                {rowsFiltradas.map((row) => (
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
                                color: row.valor <= 0 ? 'error.main' : 'primary.light' 
                            }}
                        >R$ {row.valor.toFixed(2)}
                        </Box>
                        <Box sx={{ width: '25%', color: 'grey.600' }} align='center'>
                            {row.categoria}
                        </Box>
                        <Box sx={{ width: '15%', color: 'grey.600' }} align='right'>
                            {row.data}
                        </Box>
                    </Stack>
                ))}
                </Stack>
        </ThemeProvider>
    );
}