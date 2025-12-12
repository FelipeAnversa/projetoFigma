import { ThemeProvider } from '@mui/material/styles';
import { Box, Stack, Typography, CardContent } from '@mui/material';
import { useState , useMemo } from 'react';
import { theme } from '../importantes/theme';
import Transacao from '../importantes/Transacao';
import Cards from '../importantes/Cards';
import Paginacao from '../importantes/Paginacao';
import Filtrar from '../importantes/Filtrar';
import Tabela from '../importantes/Tabela';
import { data } from '../apis/data';

export default function Pagina() {
    const [valorEntradas, setValorEntradas] = useState(0);
    const [valorSaidas, setValorSaidas] = useState(0);
    const valorTotal = valorEntradas - valorSaidas;
    const dados = data;
    const [rows, setRows] = useState([...dados]);
    const [busca, setBusca] = useState('');
    const [buscaFiltrada, setBuscaFiltrada] = useState('');
    const [rowsFiltradas, setRowsFiltradas] = useState([]);
    const [pageAtual, setPageAtual] = useState(1);
    const itemsPorPagina = 8;
    const totalPaginas = rowsFiltradas.length > 0 ? Math.ceil(rowsFiltradas.length / itemsPorPagina) : 1;

    const dadosPaginaAtual = useMemo(() => {
        const startIndex = (pageAtual - 1) * itemsPorPagina;
        const endIndex = startIndex + itemsPorPagina;
        return rowsFiltradas.slice(startIndex, endIndex);
    }, [rowsFiltradas, pageAtual, itemsPorPagina]);

    const entradas = (
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                Entradas
            </Typography>
            <Typography variant="h5" component="div">
                {valorEntradas ? `R$ ${valorEntradas.toFixed(2)}` : 'R$ 0.00'}
            </Typography>
        </CardContent>
    );

    const saidas = (
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                Saídas
            </Typography>
            <Typography variant="h5" component="div">
                {valorSaidas ? `R$ ${valorSaidas.toFixed(2)}` : 'R$ 0.00'}
            </Typography>
        </CardContent>
    );

    const total = (
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                Total
            </Typography>
            <Typography variant="h5" component="div">
                {valorTotal ? `R$ ${valorTotal.toFixed(2)}` : 'R$ 0.00'}
            </Typography>
        </CardContent>
    );

    return (
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    backgroundColor: 'grey.100',
                    height: '100vh',
                    width: '100vw',
                    fontFamily: 'Roboto, sans-serif',
                    position: 'relative',
                    paddingBottom: '80px',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'grey.50',
                        color: 'grey.600',
                        height: '20vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        zIndex: 1000,
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            width: '90vw',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <img src="fotos/image.png" alt="Finance" width={180} height={50} />
                        <Transacao 
                            setValorEntradas={setValorEntradas} 
                            setValorSaidas={setValorSaidas}
                            setRows={setRows}
                        />
                    </Stack>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-3rem',
                            display: 'flex',
                        }}
                    >
                        <Cards valor={entradas} />
                        <Cards valor={saidas} />
                        <Cards valor={total} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: '20vh',
                        paddingTop: '3rem',
                        minHeight: 'calc(100vh - 20vh)',
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem',
                        }}
                    >
                        
                    <Filtrar 
                        buscaFiltrada={buscaFiltrada}
                        rows={rows}
                        setRowsFiltradas={setRowsFiltradas}
                        setBuscaFiltrada={setBuscaFiltrada}
                        busca={busca}
                        setBusca={setBusca}
                        setPageAtual={setPageAtual}
                    />

                    </Stack>

                    <Stack
                        sx={{
                            marginTop: '3rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '85vw',
                            marginBottom: '5rem',
                        }}
                    >
                        <Tabela rowsFiltradas={dadosPaginaAtual} />
                    </Stack>
                    <Paginacao 
                        totalPaginas={totalPaginas}
                        pageAtual={pageAtual}
                        setPageAtual={setPageAtual}
                    />
                </Box>
            </Stack>
        </ThemeProvider>
    );
}