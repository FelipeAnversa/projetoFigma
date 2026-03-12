import { ThemeProvider } from '@mui/material/styles';
import { Box, Stack, Typography, CardContent, Card } from '@mui/material';
import { useState } from 'react';

import { theme } from '../importantes/theme';
import Transacao from '../importantes/Transacao';
import Cards from '../importantes/Cards';
import Paginacao from '../importantes/Paginacao';
import Filtrar from '../importantes/Filtrar';
import Tabela from '../importantes/Tabela';

import { useFinanceiro } from '../hooks/useFinanceiro';
import { useFormatacao } from '../hooks/useFormatacao';
import { usePaginacao } from '../hooks/usePaginacao';
import { useFiltro } from '../hooks/useFiltro';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Pagina() {
    const [buscaFiltrada, setBuscaFiltrada] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [limite, setLimite] = useState(10);

    const { rows, resumo, paginacao, carregarDados, adicionarTransacao, excluirTransacao } = useFinanceiro(paginaAtual, limite);
    const { formatarMoeda } = useFormatacao();
    const { handleChange } = usePaginacao(paginacao.totalPaginas, paginaAtual, setPaginaAtual);
    const { rowsFiltradas } = useFiltro(rows, buscaFiltrada);

    const { entradas: valorEntradas, saidas: valorSaidas, total: valorTotal } = resumo;

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
                <b>{formatarMoeda(valorEntradas)}</b>
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
                <b>{formatarMoeda(valorSaidas)}</b>
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
                <b>{formatarMoeda(valorTotal)}</b>
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
                        height: '16vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        zIndex: 1000,
                        gap: '1rem',
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            marginTop: { xs: '1rem', md: '0' },
                            marginBottom: '3rem',
                            width: '90vw',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src="fotos/image.png"
                            alt="Finance"
                            sx={{
                                width: '180px',
                                height: 'auto',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                        <Transacao 
                            adicionarTransacao={adicionarTransacao}
                        />
                    </Stack>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-3rem',
                            display: 'flex',
                            overflowX: 'auto',
                            width: '100%',
                            justifyContent: {xs: 'flex-start', md: 'center'},
                            alignItems: { xs: 'flex-start', md: 'center' },
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
                            ml: '1rem',
                            mr: '1rem'
                        }}
                    >
                        <Filtrar 
                            setBuscaFiltrada={setBuscaFiltrada}
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
                        <Tabela 
                            rowsFiltradas={rowsFiltradas} 
                            carregarDados={carregarDados}
                            excluirTransacao={excluirTransacao}
                        />
                    </Stack>
                    <Paginacao 
                        handleChange={handleChange}
                    />
                </Box>
            </Stack>
        </ThemeProvider>
    );
}