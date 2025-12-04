import * as React from 'react';
import { createTheme , ThemeProvider } from '@mui/material';
import { Box , Stack , TextField , Button , Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Pagina() {
    const theme = createTheme({
        palette: {
            produto: {
                greenDark: '#015F43',
                green: '#00875F',
                greenLight: '#00B37E',
                redDark: '#AA2834',
                red: '#F75A68', 
            },
            base: {
                gray1: '#121214', // BACKGROUND
                gray2: '#202024', // SHAPE PRINCIPAL
                gray3: '#29292E', // SHAPE SECUNDÁRIA
                gray4: '#323238', // SHAPE TERCIÁRIA
                gray5: '#7C7C8A', // PLACEHOLDER
                gray6: '#C4C4CC', // TEXTO BASE
                gray7: '#E1E1E6', // TITULOS
                white: '#ffffff',
            },
        },
    });
    
    const entradas = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="base.white" gutterBottom>
                    Entradas
                </Typography>
                <Typography variant="h5" component="div">
                    R$ 17.400,00
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const saidas = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="base.white" gutterBottom>
                    Saídas
                </Typography>
                <Typography variant="h5" component="div">
                    R$ 1.259,00
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const total = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="base.white" gutterBottom>
                    Total
                </Typography>
                <Typography variant="h5" component="div">
                    R$ 16.141,00
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <>
            <ThemeProvider theme={theme}>
                <Stack
                    sx={{
                        backgroundColor: 'base.gray2',
                        height: '100vh',
                        width: '100vw',
                        fontFamily: 'Roboto, sans-serif',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'base.gray1',
                            color: 'base.gray7',
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
                            <Button 
                                variant='contained'
                                sx={{
                                    position: 'absolute',
                                    right: '5rem',
                                    padding: '1rem 1.5rem',
                                    backgroundColor: 'produto.green',
                                    '&:hover': { backgroundColor: 'produto.greenDark' },
                                }}
                            >Nova transação</Button>
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
                                    bgcolor: 'base.gray3',
                                    color: 'base.gray7',
                                }}
                            >
                                {entradas}
                            </Card>
                            <Card
                                sx={{
                                    minWidth: 400,
                                    margin: '0 1rem',
                                    bgcolor: 'base.gray3',
                                    color: 'base.gray7',
                                }}
                            >
                                {saidas}
                            </Card>
                            <Card
                                sx={{
                                    minWidth: 400,
                                    margin: '0 1rem',
                                    bgcolor: 'produto.green',
                                    color: 'base.white',
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
                                bgcolor: 'base.gray1',
                                '& .MuiInputLabel-root': { color: 'base.gray5' },
                                '& .MuiFilledInput-root': { color: 'base.gray6' },
                                '& .MuiFilledInput-underline:after': { borderBottomColor: 'produto.green' },
                            }}
                        />
                        <Button 
                            variant="contained"
                            sx={{
                                marginTop: '6rem',
                                marginLeft: '10px',
                                padding: '1rem 1.5rem',
                                backgroundColor: 'produto.green',
                                '&:hover': { backgroundColor: 'produto.greenDark' },
                            }}
                        >Buscar</Button>
                    </Stack>
                </Stack>
            </ThemeProvider>
        </>
    );
}