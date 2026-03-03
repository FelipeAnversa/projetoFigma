import { TextField, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { postCriarConta } from '../visual/services/post/postCriarConta';
import { Controller, useForm } from "react-hook-form";

export default function Cadastro({ dadosLogin, onCadastroSucesso }) {
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            usuario: "",
            senha: ""
        }
    });

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        reset(); 
        setErro('');
        setSucesso('');
    };

    const formatarDataAtual = () => {
        const data = new Date();
        return data.toLocaleDateString('pt-BR');
    };

    const onSubmit = (data) => {
        const { usuario, senha } = data;
        
        const usuarioExistente = dadosLogin.find((item) => item.login === usuario);

        if (usuarioExistente) {
            setErro('Usuário já existe.');
            setSucesso('');
        } else {
            const dataFormatada = formatarDataAtual();
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
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center', mt: 2 }}>Página de Cadastro</DialogTitle>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }}>
                        <Controller 
                            name='usuario'
                            control={control}
                            rules={{ required: "O nome de usuário é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Usuário"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.usuario}
                                    helperText={errors.usuario?.message}
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
                                    fullWidth
                                    error={!!errors.senha}
                                    helperText={errors.senha?.message}
                                />
                            )}
                        />
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button
                            variant="contained"
                            type="submit" 
                        >
                            Cadastrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar open={!!erro} autoHideDuration={6000} onClose={() => setErro('')}>
                <Alert severity="error">{erro}</Alert>
            </Snackbar>

            <Snackbar open={!!sucesso} autoHideDuration={6000} onClose={() => setSucesso('')}>
                <Alert severity="success">{sucesso}</Alert>
            </Snackbar>
        </>
    );
}