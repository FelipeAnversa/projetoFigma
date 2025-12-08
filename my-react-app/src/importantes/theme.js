import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00875F',
            dark: '#015F43',
            light: '#00B37E',
        },
        error: {
            main: '#F75A68',
            dark: '#AA2834',
        },
        background: {
            default: '#121214',  // base.gray1
            paper: '#202024',     // base.gray2
        },
        text: {
            primary: '#E1E1E6',   // base.gray7
            secondary: '#C4C4CC', // base.gray6
        },
        grey: {
            50: '#121214',   // base.gray1
            100: '#202024',  // base.gray2
            200: '#29292E',  // base.gray3
            300: '#323238',  // base.gray4
            400: '#7C7C8A',  // base.gray5
            500: '#C4C4CC',  // base.gray6
            600: '#E1E1E6',  // base.gray7
            700: '#ffffff',  // base.white
        },
    },
});