import { Button, TextField, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import usePaginaContext from '../hooks/usePaginaContext';

export default function Filtrar() {
    const { setBuscaFiltrada } = usePaginaContext();
    
    const { register, handleSubmit } = useForm({
        defaultValues: { termo: '' }
    });

    const aoSubmeter = (dados) => {
        setBuscaFiltrada(dados.termo);
    };

    return (
        <Stack 
            component="form" 
            onSubmit={handleSubmit(aoSubmeter)} 
            direction="row" 
            sx={{ width: '100%', justifyContent: 'center' }}
        >
            <TextField 
                {...register("termo")} 
                label="Busque uma transação" 
                variant="filled"
                sx={{
                    width: '80vw',
                    bgcolor: 'grey.50',
                    '& .MuiInputLabel-root': { color: 'grey.400' },
                    '& .MuiFilledInput-root': { color: 'grey.500' },
                    '& .MuiFilledInput-underline:after': { borderBottomColor: 'primary.main' }
                }}
            />
            <Button 
                type="submit" 
                variant="outlined"
                sx={{
                    marginLeft: '10px',
                    padding: '1rem 1.5rem',
                    '&:hover': { backgroundColor: 'primary.dark' },
                }}
            >
                <SearchIcon /> Buscar
            </Button>
        </Stack>
    );
}