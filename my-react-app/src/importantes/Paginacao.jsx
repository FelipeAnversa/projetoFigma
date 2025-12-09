import { Box , Pagination } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export default function Paginacao() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'grey.100',
                    padding: '1rem 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999,
                    borderTop: '1px solid',
                    borderColor: 'grey.300',
                }}
            >
                <Pagination
                    count={10}
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': { color: 'grey.700' },
                        '& .MuiPaginationItem-root.Mui-selected': { 
                            backgroundColor: 'primary.main' 
                        },
                    }}
                />
            </Box>
        </ThemeProvider>
    );
}