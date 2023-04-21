import { createTheme } from '@mui/material/styles';

// Light theme colors
const lightColors = {
    primary: {
        main: '#1976d2',
    },
    secondary: {
        main: '#dc004e',
    },
    background: {
        default: '#fff',
        paper: '#f4f6f8',
    },
    text: {
        primary: '#202124',
        secondary: '#5f6368',
    },
    button: {
        default: '#1976d2',
        hover: '#1565c0',
    },
};

// Dark theme colors
const darkColors = {
    primary: {
        main: '#90caf9',
    },
    secondary: {
        main: '#f48fb1',
    },
    background: {
        default: '#121212',
        paper: '#1e1e1e',
    },
    text: {
        primary: '#f5f5f5',
        secondary: '#bdbdbd',
    },
    button: {
        default: '#90caf9',
        hover: '#64b5f6',
    },
};

// Define the themes
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        ...lightColors,
    },
    typography: {
        //fontFamily: 'Manrope, sans-serif',
        //fontWeightRegular: 500,
        button: {
            //fontSize: '14px',
            //textTransform: 'none',
            margin: '0 1px 0 1px',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        ...darkColors,
    },
    typography: {
        //fontFamily: 'Manrope, sans-serif',
        //fontWeightRegular: 500,
        button: {
            //fontSize: '14px',
            //textTransform: 'none',
            margin: '0 1px 0 1px',
        },
    },
});

const defaultTheme = (prefersDarkMode: boolean) => {
    return prefersDarkMode ? darkTheme : lightTheme;
};

export default defaultTheme;
