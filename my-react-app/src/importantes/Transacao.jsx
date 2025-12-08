import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { theme } from './theme';

export default function Transacao({ setValorEntradas, setValorSaidas }) {
    const [open, setOpen] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('entrada');
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setDescricao('');
        setPreco('');
        setCategoria('');
        setTipoTransacao('entrada');
    };
    
    const handleCadastrar = () => {
        const valorNumerico = parseFloat(preco);
        
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            alert('Por favor, insira um valor válido maior que zero');
            return;
        }
        
        if (tipoTransacao === 'entrada') {
            setValorEntradas(prev => prev + valorNumerico);
        } else {
            setValorSaidas(prev => prev + valorNumerico);
        }
        
        handleClose();
    };
    
    return (
        <Stack sx={{fontFamily: 'Roboto, sans-serif'}}>
            <Button 
                variant='contained' 
                onClick={handleClickOpen}
                sx={{
                    padding: '1rem 1.5rem',
                    backgroundColor: 'primary.green',
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
                >   
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '1.5rem' }}>
                        <DialogTitle sx={{ backgroundColor: 'grey.100' }}>
                            Nova Transação
                        </DialogTitle>
                        <Button sx={{ color: 'grey.700'}} onClick={handleClose}>
                            X
                        </Button>
                    </Stack>
                    <DialogContent sx={{ backgroundColor: 'grey.100', paddingTop: '1rem!important' }}>
                        <Stack spacing={2}>
                            <TextField 
                                label="Descrição" 
                                variant="outlined" 
                                fullWidth 
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                                
                            <TextField 
                                label="Preço" 
                                variant="outlined" 
                                fullWidth 
                                type="number"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                            />
                                
                            <TextField 
                                label="Categoria" 
                                variant="outlined" 
                                fullWidth 
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            />
                            
                            <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
                                <Button 
                                    variant={tipoTransacao === 'entrada' ? 'contained' : 'outlined'} 
                                    color="primary.main" 
                                    fullWidth
                                    onClick={() => setTipoTransacao('entrada')}
                                >
                                    Entrada
                                </Button>
                                <Button 
                                    variant={tipoTransacao === 'saida' ? 'contained' : 'outlined'} 
                                    color="error.main" 
                                    fullWidth
                                    onClick={() => setTipoTransacao('saida')}
                                >
                                    Saída
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogContent>
                    
                    <DialogActions sx={{ backgroundColor: 'grey.100', padding: '0 1.5rem 1.5rem', justifyContent: 'center'}}>
                        <Button 
                            variant="contained" 
                            color="grey.700" 
                            onClick={handleCadastrar}
                            disabled={!descricao || !preco || !categoria}
                        >
                            Cadastrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </Stack>
    );
}