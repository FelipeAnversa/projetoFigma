import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import SearchIcon from '@mui/icons-material/Search';

export default function Filtrar({ buscaFiltrada, rows, setRowsFiltradas, setBuscaFiltrada, busca, setBusca, setPaginaAtual }) {
    useEffect(() => {
        filtrar(buscaFiltrada, rows, setRowsFiltradas, setPaginaAtual);
    }, [buscaFiltrada, rows, setRowsFiltradas, filtrar, setPaginaAtual]);
    
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
                    '.MuiFilledInput-root.Mui-focused': {
                        bgcolor: 'grey.50',
                    }
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

const filtrar = (buscaFiltrada, rows, setRowsFiltradas, setPaginaAtual) => {
    const rowsArray = Array.isArray(rows) ? rows : [];
    if (!buscaFiltrada || buscaFiltrada.trim() === '') {
        setRowsFiltradas(rowsArray);
    } else {
        const filtro = rowsArray.filter((row) =>
            row.nome?.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.categoria?.toLowerCase().includes(buscaFiltrada.toLowerCase()) ||
            row.data?.toLowerCase().includes(buscaFiltrada.toLowerCase())
        );
        setRowsFiltradas(filtro);
        setPaginaAtual(1);
    }
};