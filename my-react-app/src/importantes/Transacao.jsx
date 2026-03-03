import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { theme } from './theme';
import { postTransacoes } from '../visual/services/post/postTransacoes';
import { getTransacoes } from '../visual/services/get/getTransacoes';
import { Controller, useForm } from "react-hook-form";

export default function Transacao({ setRows, setValorEntradas, setValorSaidas, setValorTotal, paginaAtual, limite }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            descricao: '',
            preco: 0,
            categoria: '',
            tipoTransacao: 'entrada'
        }
    });
    
    const [open, setOpen] = useState(false);
    
    function createData(nome, valor, categoria, tipo, data) {
        return { 
            id: Date.now(),
            nome, 
            valor: parseFloat(valor),
            categoria, 
            tipo, 
            data
        };
    }

    function ComponenteData() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        reset();
    };
    
    const onSubmit = async (data) => {
        const valorNumerico = parseFloat(data.preco);
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            alert('Por favor, insira um valor válido maior que zero');
            return;
        }
        if (data.tipoTransacao === 'entrada') {
            setValorEntradas(prev => prev + valorNumerico);
            setValorTotal(prev => prev + valorNumerico);
        } else {
            setValorSaidas(prev => prev + valorNumerico);
            setValorTotal(prev => prev - valorNumerico);
        }
        const dataFormatada = ComponenteData();
        const precoParaTabela = data.tipoTransacao === 'saida' ? -valorNumerico : valorNumerico;
        const novaTransacao = createData(data.descricao, precoParaTabela, data.categoria, data.tipoTransacao, dataFormatada);
        await postTransacoes(data.descricao, valorNumerico, data.categoria, data.tipoTransacao);
        setRows(prevRows => {
            const safePrevRows = Array.isArray(prevRows) ? prevRows : [];
            return [...safePrevRows, novaTransacao || {}];
        });
        getTransacoes(paginaAtual, limite).then(data => setRows(data.transacoes || []));
        reset();
        handleClose();
    };
    
    return (
        <Stack sx={{fontFamily: 'Roboto, sans-serif'}}>
            <Button 
                variant='contained' 
                onClick={handleClickOpen}
                sx={{
                    padding: '1rem 1.5rem',
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                }}
            >
                Nova transação
            </Button>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Dialog 
                        open={open} 
                        onClose={handleClose}
                        maxWidth="sm"
                        fullWidth
                        sx={{
                            '& .MuiDialog-paper': {
                                backgroundColor: 'grey.100',
                            }
                        }}
                    >   
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ 
                            padding: '1.5rem',
                            backgroundColor: 'grey.100'
                        }}>
                            <DialogTitle sx={{ 
                                padding: 0,
                                color: 'grey.700',
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            }}>
                                Nova Transação
                            </DialogTitle>
                            <Button 
                                sx={{ 
                                    color: 'grey.500',
                                    minWidth: 'auto',
                                    padding: '4px 8px'
                                }} 
                                onClick={handleClose}
                            >
                                ✕
                            </Button>
                        </Stack>
                        <DialogContent sx={{ 
                            backgroundColor: 'grey.100', 
                            paddingTop: '0!important',
                            paddingBottom: '1.5rem!important'
                        }}>
                            <Stack spacing={3}>
                                <Controller 
                                    name='descricao'
                                    control={control}
                                    rules={{ required: "A descrição é obrigatório" }}
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Descrição" 
                                            variant="outlined" 
                                            fullWidth 
                                            error={!!errors.descricao}
                                            helperText={errors.descricao?.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'grey.50'
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Controller 
                                    name='preco'
                                    control={control}
                                    rules={{ required: "O Preço é obrigatório" }} 
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Preço" 
                                            variant="outlined" 
                                            fullWidth 
                                            type="number"
                                            error={!!errors.preco}
                                            helperText={errors.preco?.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'grey.50'
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Controller 
                                    name='categoria'
                                    control={control}
                                    rules={{ required: 'A Categoria é obrigatória' }}
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Categoria" 
                                            variant="outlined" 
                                            fullWidth 
                                            error={!!errors.categoria}
                                            helperText={errors.categoria?.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'grey.50'
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
                                    <Button 
                                        variant={tipoTransacao === 'entrada' ? 'contained' : 'outlined'} 
                                        sx={{
                                            backgroundColor: tipoTransacao === 'entrada' ? 'primary.main' : 'transparent',
                                            color: tipoTransacao === 'entrada' ? 'white' : 'primary.main',
                                            borderColor: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: tipoTransacao === 'entrada' ? 'primary.dark' : 'rgba(0, 135, 95, 0.1)'
                                            }
                                        }}
                                        fullWidth
                                        onClick={() => setValue('tipoTransacao', 'entrada')}
                                    >
                                        Entrada
                                    </Button>
                                    <Button 
                                        variant={tipoTransacao === 'saida' ? 'contained' : 'outlined'} 
                                        sx={{
                                            backgroundColor: tipoTransacao === 'saida' ? 'error.main' : 'transparent',
                                            color: tipoTransacao === 'saida' ? 'white' : 'error.main',
                                            borderColor: 'error.main',
                                            '&:hover': {
                                                backgroundColor: tipoTransacao === 'saida' ? 'error.dark' : 'rgba(247, 90, 104, 0.1)'
                                            }
                                        }}
                                        fullWidth
                                        onClick={() => setValue('tipoTransacao', 'saida')}
                                    >
                                        Saída
                                    </Button>
                                </Stack>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ 
                            backgroundColor: 'grey.100', 
                            padding: '0 1.5rem 1.5rem', 
                            justifyContent: 'center'
                        }}>
                            <Button 
                                type="submit"
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    minWidth: 120,
                                    '&:hover': {
                                        backgroundColor: 'primary.dark'
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'primary.main',
                                        color: 'white'
                                    }
                                }}
                                disabled={Object.keys(errors).length > 0}
                            >
                                Cadastrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </ThemeProvider>
        </Stack>
    );
}