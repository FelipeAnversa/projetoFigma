import { Stack , Table , TableBody , TableCell , TableRow , Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export default function Tabela({ rowsFiltradas }) {
    return (
        <ThemeProvider theme={theme}>
            <Stack
                component={Paper}
                sx={{
                    bgcolor: 'grey.300',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
                >
                <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0px 8px' }} aria-label="customized table">
                    <TableBody>
                        {rowsFiltradas.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ color: 'grey.600' }} component="th" scope="row">{row.descricao}</TableCell>
                                <TableCell 
                                    sx={{
                                        color: row.valor < 0 ? 'error.main' : 'primary.main'
                                    }}
                                    align="right"
                                >R$ {row.valor.toFixed(2)}</TableCell>
                                <TableCell sx={{ color: 'grey.600' }} align="right">{row.categoria}</TableCell>
                                <TableCell sx={{ color: 'grey.600' }} align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </ThemeProvider>
    );
}