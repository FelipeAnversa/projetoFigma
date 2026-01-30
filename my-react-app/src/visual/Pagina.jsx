import { ThemeProvider } from '@mui/material/styles';
import { Box, Stack, Typography, CardContent, Card } from '@mui/material';
import { useState , useEffect } from 'react';
import { theme } from '../importantes/theme';
import Transacao from '../importantes/Transacao';
import Cards from '../importantes/Cards';
import Paginacao from '../importantes/Paginacao';
import Filtrar from '../importantes/Filtrar';
import Tabela from '../importantes/Tabela';
import { data } from '../apis/data';
import { valorAPI } from '../apis/valorAPI'
import { paginacaoAPI } from '../apis/paginacaoAPI';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Pagina() {
    const [loading, setLoading] = useState(true);
    const [valorEntradas, setValorEntradas] = useState(0);
    const [valorSaidas, setValorSaidas] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [rows, setRows] = useState([]);
    const [busca, setBusca] = useState('');
    const [buscaFiltrada, setBuscaFiltrada] = useState('');
    const [rowsFiltradas, setRowsFiltradas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itemsPorPagina, setItemsPorPagina] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(1);
    
    useEffect(() => {
        async function fetchAllData() {
            try {
                setLoading(true);
                const dadosAPI = await data();
                if (dadosAPI && Array.isArray(dadosAPI)) {
                    setRows(dadosAPI);
                    setRowsFiltradas(dadosAPI);
                }
                const valorData = await valorAPI();
                if (valorData && !valorData.error) {
                    setValorEntradas(valorData.entradas || 0);
                    setValorSaidas(valorData.saidas || 0);
                    setValorTotal(valorData.total || 0);
                }
                try {
                    const pagData = await paginacaoAPI();
                    if (pagData?.paginaAtual) {
                        setPaginaAtual(Number(pagData.paginaAtual));
                    }
                    if (pagData?.itemsPorPagina) {
                        setItemsPorPagina(Number(pagData.itemsPorPagina));
                    }
                    if (pagData?.totalPaginas) {
                        setTotalPaginas(Number(pagData.totalPaginas));
                    }
                } catch (pagError) {
                    console.error("Erro na paginação:", pagError);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    }, []);

    useEffect(() => {
        console.log("Pagina renderizada. Loading:", loading, "Rows:", rows.length);
    }, [loading, rows.length]);

    function formatarValor(valor) {
        if (typeof valor === 'string') {
            const limpo = valor
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            
            const numero = parseFloat(limpo);
            if (!isNaN(numero)) {
                return numero.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                });
            }
        }
        if (typeof valor === 'number') {
            return valor.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
        }
        return valor;
    }

    const entradas = (
        <CardContent>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Entradas
                </Typography>
                <ArrowCircleUpIcon color="success"/>
            </Stack>
            <Typography variant="h5" component="div">
                <b>{formatarValor(valorEntradas)}</b>
            </Typography>
        </CardContent>
    );

    const saidas = (
        <CardContent>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Saídas
                </Typography>
                <ArrowCircleDownIcon sx={{ color: "error.main" }}/>
            </Stack>
            <Typography variant="h5" component="div">
                <b>{formatarValor(valorSaidas)}</b>
            </Typography>
        </CardContent>
    );

    const total = (
        <CardContent>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Total
                </Typography>
                <AttachMoneyIcon />
            </Stack>
            <Typography variant="h5" component="div">
                <b>{formatarValor(valorTotal)}</b>
            </Typography>
        </CardContent>
    );

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            fontFamily: 'Roboto, sans-serif',
                        }}
                    >
                        Carregando...
                    </Typography>
                </Box>
            </ThemeProvider>
        );
    }

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
                        height: '16vh',
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
                            marginTop: '0',
                            marginBottom: '2rem',
                            width: '90vw',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <img src="fotos/image.png" alt="Finance" width={180} height={50} />
                        <Transacao 
                            setValorEntradas={setValorEntradas} 
                            setValorSaidas={setValorSaidas}
                            setValorTotal={setValorTotal}
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
                        <Card
                            sx={{
                                minWidth: { xs: 280, md: 400 },
                                margin: '0 1rem',
                                bgcolor: 'primary.dark',
                                color: 'grey.600',
                            }}
                        >
                            {total}
                        </Card>
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: '15vh',
                        paddingTop: '1rem',
                        minHeight: '100vh',
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '4rem', 
                        }}
                    >
                        
                    <Filtrar 
                        buscaFiltrada={buscaFiltrada}
                        rows={rows}
                        setRowsFiltradas={setRowsFiltradas}
                        setBuscaFiltrada={setBuscaFiltrada}
                        busca={busca}
                        setBusca={setBusca}
                        setPaginaAtual={setPaginaAtual}
                    />

                    </Stack>

                    <Stack
                        sx={{
                            marginTop: '1.2rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '85vw',
                            marginBottom: '5rem',
                        }}
                    >
                        <Tabela rowsFiltradas={rowsFiltradas} itemsPorPagina={itemsPorPagina} paginaAtual={paginaAtual} setRows={setRows} setValorEntradas={setValorEntradas} setValorSaidas={setValorSaidas} setValorTotal={setValorTotal} />
                    </Stack>
                    <Paginacao 
                        totalPaginas={totalPaginas}
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                    />
                </Box>
            </Stack>
        </ThemeProvider>
    );
}