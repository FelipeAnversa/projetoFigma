import Card from '@mui/material/Card';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import PropTypes from 'prop-types';

Cards.propTypes = {
    valor: PropTypes.node.isRequired
};

export default function Cards({ valor }) {
    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minWidth: { xs: 280, md: 400 },
                    margin: '0 1rem',
                    bgcolor: 'grey.200',
                    color: 'grey.600',
                }}
            >
                {valor}
            </Card>
        </ThemeProvider>
    );
}