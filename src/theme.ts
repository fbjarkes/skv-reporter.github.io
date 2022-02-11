import { createTheme } from '@mui/material/styles';

const defaultTheme = (prefersDarkMode: boolean) =>
    createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    });

export default defaultTheme;
