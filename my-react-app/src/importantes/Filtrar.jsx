import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import SearchIcon from '@mui/icons-material/Search';

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
                variant="outlined"
                onClick={() => setBuscaFiltrada(busca)}
                sx={{
                    marginLeft: '10px',
                    padding: '1rem 1.5rem',
                    '&:hover': { backgroundColor: 'primary.dark' },
                }}
            >
            <SearchIcon />Buscar</Button>
        </ThemeProvider>
    );
}

const filtrar = (buscaFiltrada, rows, setRowsFiltradas, setPageAtual) => {
    if (buscaFiltrada === '' || buscaFiltrada === null) {
        setRowsFiltradas(rows);
    } else {
        const filtro = rows.filter((row) =>
            row.nome.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.categoria.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.data.toLowerCase().includes(buscaFiltrada.toLowerCase())
        );
        setRowsFiltradas(filtro);
        setPageAtual(1);
    }
};