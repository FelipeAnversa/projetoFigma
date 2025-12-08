import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Stack, TextField, Button, Card } from '@mui/material';
import Transacao from './importantes/Transacao';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { theme } from './importantes/theme';

export default function Pagina() {
    const [valorEntradas, setValorEntradas] = useState(0);
    const [valorSaidas, setValorSaidas] = useState(0);
    const valorTotal = valorEntradas - valorSaidas;

    
    const entradas = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Entradas
                </Typography>
                <Typography variant="h5" component="div">
                    {valorEntradas ? `R$ ${valorEntradas}` : 'R$ 0,00'}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const saidas = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Saídas
                </Typography>
                <Typography variant="h5" component="div">
                    {valorSaidas ? `R$ ${valorSaidas}` : 'R$ 0,00'}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const total = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="grey.700" gutterBottom>
                    Total
                </Typography>
                <Typography variant="h5" component="div">
                    {valorTotal ? `R$ ${valorTotal}` : 'R$ 0,00'}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    backgroundColor: 'grey.100',
                    height: '100vh',
                    width: '100vw',
                    fontFamily: 'Roboto, sans-serif',
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
                        position: 'relative',
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
                        />
                    </Stack>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-3rem',
                            display: 'flex',
                        }}
                    >
                        <Card
                            sx={{
                                minWidth: 400,
                                margin: '0 1rem',
                                bgcolor: 'grey.200',
                                color: 'grey.600',
                            }}
                        >
                            {entradas}
                        </Card>
                        <Card
                            sx={{
                                minWidth: 400,
                                margin: '0 1rem',
                                bgcolor: 'grey.200',
                                color: 'grey.600',
                            }}
                        >
                            {saidas}
                        </Card>
                        <Card
                            sx={{
                                minWidth: 400,
                                margin: '0 1rem',
                                bgcolor: 'primary.main',
                                color: 'grey.700',
                            }}
                        >
                            {total}
                        </Card>
                    </Box>
                </Box>

                <Stack
                    sx={{
                        display: 'block',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <TextField 
                        id="filled-basic" 
                        label="Busque uma transação" 
                        variant="filled"
                        sx={{
                            marginTop: '6rem',
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
                        sx={{
                            marginTop: '6rem',
                            marginLeft: '10px',
                            padding: '1rem 1.5rem',
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                    >Buscar</Button>
                </Stack>
                <Stack
                    sx={{
                        marginTop: '34rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Pagination 
                        count={10}
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': { color: 'grey.700' },
                            '& .MuiPaginationItem-root.Mui-selected': { 
                                backgroundColor: 'primary.main' 
                            },
                        }}
                    />
                </Stack>
            </Stack>
        </ThemeProvider>
    );
}