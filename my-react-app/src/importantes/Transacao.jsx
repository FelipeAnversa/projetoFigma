import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { theme } from './theme';
import { postTransacoes } from '../visual/services/post/postTransacoes';
import { getTransacoes } from '../visual/services/get/getTransacoes';
import { Controller, useForm } from "react-hook-form";

export default function Transacao({ setRows, setValorEntradas, setValorSaidas, setValorTotal, paginaAtual, limite }) {
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            descricao: '',
            preco: '',
            categoria: '',
            tipoTransacao: 'entrada',
            data: dataHoje
        }
    });
    
    const tipoTransacao = watch('tipoTransacao');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        reset();
        setOpen(false);
    };
    
    const onSubmit = async (dados) => {
        const valorNumerico = parseFloat(dados.preco);
        await postTransacoes(dados.descricao, valorNumerico, dados.categoria, dados.tipoTransacao);
        if (dados.tipoTransacao === 'entrada') {
            setValorEntradas(prev => prev + valorNumerico);
            setValorTotal(prev => prev + valorNumerico);
        } else {
            setValorSaidas(prev => prev + valorNumerico);
            setValorTotal(prev => prev - valorNumerico);
        }
        const resposta = await getTransacoes(paginaAtual, limite);
        setRows(resposta.transacoes || []);
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
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Descrição" 
                                            variant="outlined" 
                                            fullWidth 
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
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Preço" 
                                            variant="outlined" 
                                            fullWidth 
                                            type="number"
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
                                    render={({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Categoria" 
                                            variant="outlined" 
                                            fullWidth 
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
                                        type="button"
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
                                        type="button"
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
                                    }
                                }}
                                onClick={handleSubmit(onSubmit)}
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