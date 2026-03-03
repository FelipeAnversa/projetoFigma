import { Box, Typography, TextField, Button, Stack, Alert, Snackbar, Card } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../importantes/theme';
import { useEffect, useState } from 'react';
import api from "../apis/api_login.json"
import Cadastro from '../importantes/Cadastro';
import Pagina from './Pagina';
import { getInfo } from './services/get/getInfo';
import { postLogin } from './services/post/postLogin';
import { Controller, useForm } from "react-hook-form";

export default function Login() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            usuario: "",
            senha: ""
        }
    });

    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [logado, setLogado] = useState(false);
    const [dadosLogin, setDadosLogin] = useState([...api]);

    const onSubmit = (data) => {
        const { usuario, senha } = data;

        const usuarioValido = dadosLogin.find((item) => item.login === usuario && item.senha === senha);
        const response = postLogin(usuario, senha);

        if (usuarioValido || response) {
            setSucesso('Login bem-sucedido!');
            setErro('');
            reset();
            setTimeout(() => {
                setLogado(true);
            }, 1000);
        } else {
            setErro('Usuário ou senha inválidos.');
            setSucesso('');
        }
    };

    const handleCadastroSucesso = (novosDados) => {
        setDadosLogin([...novosDados]);
        setSucesso('Cadastro realizado com sucesso! Agora faça login.');
    };

    useEffect(() => {
        getInfo();
    }, []);

    if (logado) {
        return <Pagina />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: 2,
                    backgroundImage: `url('fotos/gremio.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Card
                    sx={{
                        backgroundColor: 'grey.300'
                    }}
                >
                    <Typography variant="h4" component="div" sx={{ margin: '2rem', fontFamily: 'Roboto, sans-serif', color: 'grey.700' }}>
                        <b>Página de Login</b>
                    </Typography>
                </Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} alignItems="center">
                        <Controller 
                            name='usuario'
                            control={control}
                            rules={{ required: "O nome de usuário é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Usuário"
                                    variant="outlined"
                                    error={!!errors.usuario}
                                    helperText={errors.usuario?.message}
                                    sx={{ 
                                        width: '300px',
                                        input: { color: 'grey.50' },
                                        '& label': { color: 'grey.50' },
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'grey.700'
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller 
                            name='senha'
                            control={control}
                            rules={{ required: "A senha é obrigatória" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Senha"
                                    variant="outlined"
                                    type="password"
                                    error={!!errors.senha}
                                    helperText={errors.senha?.message}
                                    sx={{ 
                                        width: '300px', 
                                        input: { color: 'grey.50' },
                                        '& label': { color: 'grey.50' },
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'grey.700'
                                        }
                                    }}
                                />
                            )}
                        />
                        <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
                            <Cadastro 
                                dadosLogin={dadosLogin} 
                                onCadastroSucesso={handleCadastroSucesso} 
                            />
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                <Snackbar 
                    open={!!erro} 
                    autoHideDuration={6000} 
                    onClose={() => setErro('')}
                >
                    <Alert severity="error" onClose={() => setErro('')}>
                        {erro}
                    </Alert>
                </Snackbar>
                <Snackbar 
                    open={!!sucesso} 
                    autoHideDuration={6000} 
                    onClose={() => setSucesso('')}
                >
                    <Alert severity="success" onClose={() => setSucesso('')}>
                        {sucesso}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}