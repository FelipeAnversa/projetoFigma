import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { theme } from './theme';

export default function Transacao({ setValorEntradas, setValorSaidas, setRows }) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('entrada');
    
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
        setNome('');
        setValor('');
        setCategoria('');
        setTipoTransacao('entrada');
    };
    
    const handleCadastrar = () => {
        const valorNumerico = parseFloat(valor);
        const precoParaTabela = tipoTransacao === 'saida' ? -valorNumerico : valorNumerico;
        
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            alert('Por favor, insira um valor válido maior que zero');
            return;
        }
        
        if (tipoTransacao === 'entrada') {
            setValorEntradas(prev => prev + valorNumerico);
        } else {
            setValorSaidas(prev => prev + valorNumerico);
        }
        
        const dataFormatada = ComponenteData();
        const novaTransacao = createData(nome, precoParaTabela, categoria, tipoTransacao, dataFormatada);
        setRows(prevRows => [...prevRows, novaTransacao]);
        
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
                            <TextField 
                                label="Descrição" 
                                variant="outlined" 
                                fullWidth 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'grey.50'
                                    }
                                }}
                            />
                                
                            <TextField 
                                label="Preço" 
                                variant="outlined" 
                                fullWidth 
                                type="number"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'grey.50'
                                    }
                                }}
                            />
                                
                            <TextField 
                                label="Categoria" 
                                variant="outlined" 
                                fullWidth 
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'grey.50'
                                    }
                                }}
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
                                    onClick={() => setTipoTransacao('entrada')}
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
                                    onClick={() => setTipoTransacao('saida')}
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
                            onClick={handleCadastrar}
                            disabled={!nome || !valor || !categoria}
                        >
                            Cadastrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </Stack>
    );
}