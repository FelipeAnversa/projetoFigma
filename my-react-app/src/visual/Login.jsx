import { Box, Typography, TextField, Button, Stack, Alert, Snackbar, Card } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../importantes/theme';
import { useEffect, useState } from 'react';
import api from "../apis/api_login.json"
import Cadastro from '../importantes/Cadastro';
import Pagina from './Pagina';
import { getInfo } from './services/get/getInfo';
import { postLogin } from './services/post/postLogin';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [logado, setLogado] = useState(false);
    const [dadosLogin, setDadosLogin] = useState([...api]);

    const verificar = () => {
        const usuarioValido = dadosLogin.find((item) => item.login === usuario && item.senha === senha);
        const response = postLogin(usuario, senha);
        if (usuarioValido || !response.error) {
            setSucesso('Login bem-sucedido!');
            setErro('');
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
                <TextField
                    label="Usuário"
                    variant="outlined"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    sx={{ 
                        width: '300px',
                        input: { color: 'grey.50' },
                        '& label': { color: 'grey.50' },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'grey.700'
                        }
                    }}
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    sx={{ 
                        width: '300px', 
                        input: { color: 'grey.50' },
                        '& label': { color: 'grey.50' },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'grey.700'
                        }
                    }}
                />
                <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
                    <Cadastro 
                        dadosLogin={dadosLogin} 
                        onCadastroSucesso={handleCadastroSucesso} 
                    />
                    <Button
                        variant="contained"
                        onClick={verificar}
                    >
                        Entrar
                    </Button>
                </Stack>
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