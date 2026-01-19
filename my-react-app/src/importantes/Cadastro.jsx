import { TextField, Button, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { postCriarConta } from '../visual/services/post/postCriarConta';

export default function Cadastro({ dadosLogin, onCadastroSucesso }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setUsuario('');
        setSenha('');
        setErro('');
        setSucesso('');
    };

    function ComponenteData() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const cadastrar = () => {
        const usuarioExistente = dadosLogin.find((item) => item.login === usuario);
        if (usuarioExistente) {
            setErro('Usuário já existe.');
            setSucesso('');
        } else {
            const dataFormatada = ComponenteData();
            const novoUsuario = { login: usuario, senha: senha, 'criado-em': dataFormatada };
            const novosDados = [...dadosLogin, novoUsuario];
            
            onCadastroSucesso(novosDados);
            postCriarConta(usuario, senha, dataFormatada);

            setSucesso('Cadastro realizado com sucesso!');
            setErro('');
            
            setTimeout(() => {
                handleClose();
            }, 1000);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Cadastrar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ margin: '2rem' }}>Página de Cadastro</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}>
                    <TextField
                        label="Usuário"
                        variant="outlined"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Senha"
                        variant="outlined"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                
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

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        variant="contained"
                        onClick={cadastrar}
                    >
                        Cadastrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}