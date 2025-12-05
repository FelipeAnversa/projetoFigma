import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Transacao({ theme, setValorEntradas, setValorSaidas, valorEntradas, valorSaidas }) {
    const [open, setOpen] = useState(false);
    const [preco, setPreco] = useState(0);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const colocarPreco = (event) => {
        setPreco(event.target.value);
    };
    
    const verificar = () => {
        if (preco > 0) {
            setValorEntradas(valorEntradas + preco);
        } else {
            setValorSaidas(valorSaidas + Math.abs(preco));
        }
        setPreco(0);
    };
    
    return (
        <>
            <Button 
                variant='contained' 
                onClick={handleClickOpen}
                sx={{
                    position: 'absolute',
                    right: '5rem',
                    padding: '1rem 1.5rem',
                    backgroundColor: 'produto.green',
                    '&:hover': { backgroundColor: 'produto.greenDark' },
                }}
            >Nova transação</Button>
            <ThemeProvider theme={theme}>
                <Dialog 
                    open={open} 
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Stack
                        sx={{
                            backgroundColor: 'base.gray2',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: 24,
                            gap: '1rem',
                            width: '90%',
                            maxWidth: '400px',
                        }}
                    >
                        <DialogTitle id="alert-dialog-title">
                            Nova Transação
                        </DialogTitle>
                        
                        <DialogContent>
                            <TextField 
                                label="Descrição" 
                                variant="outlined" 
                                fullWidth 
                            />
                                
                            <TextField 
                                label="Preço" 
                                variant="outlined" 
                                fullWidth 
                                type="number"
                                onChange={colocarPreco}
                            />
                                
                            <TextField 
                                label="Categoria" 
                                variant="outlined" 
                                fullWidth 
                            />
                        </DialogContent>
                        <DialogActions>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="success" fullWidth>
                                    Entrada
                                </Button>
                                <Button variant="contained" color="error" fullWidth>
                                    Saída
                                </Button>
                            </Stack>
                            
                            <Button variant="contained" color="primary" onClick={verificar} fullWidth>
                                Cadastrar
                            </Button>
                        </DialogActions>
                    </Stack>
                </Dialog>
            </ThemeProvider>
        </>
    );
}