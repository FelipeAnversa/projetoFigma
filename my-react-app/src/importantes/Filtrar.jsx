import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export default function Filtrar({ buscaFiltrada, rows, setRowsFiltradas, setBuscaFiltrada, busca, setBusca, setPageAtual }) {
    useEffect(() => {
        filtrar(buscaFiltrada, rows, setRowsFiltradas, setPageAtual);
    }, [buscaFiltrada, rows, setRowsFiltradas, filtrar, setPageAtual]);
    
    return (
        <ThemeProvider theme={theme}>
            <TextField 
                id="filled-basic" 
                label="Busque uma transação" 
                variant="filled"
                onChange={(e) => setBusca(e.target.value)}
                sx={{
                    width: '80vw',
                    bgcolor: 'grey.50',
                    '& .MuiInputLabel-root': { color: 'grey.400' },
                    '& .MuiFilledInput-root': { color: 'grey.500' },
                    '& .MuiFilledInput-underline:after': { 
                        borderBottomColor: 'primary.main' 
                    },
                }}
            />
            <Button 
                variant="contained"
                onClick={() => setBuscaFiltrada(busca)}
                sx={{
                    marginLeft: '10px',
                    padding: '1rem 1.5rem',
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                }}
            >Buscar</Button>
        </ThemeProvider>
    );
}

const filtrar = (buscaFiltrada, rows, setRowsFiltradas, setPageAtual) => {
    if (buscaFiltrada === '' || buscaFiltrada === null) {
        setRowsFiltradas(rows);
    } else {
        const filtro = rows.filter((row) =>
            row.descricao.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.categoria.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.data.toLowerCase().includes(buscaFiltrada.toLowerCase())
        );
        setRowsFiltradas(filtro);
        setPageAtual(1);
    }
};