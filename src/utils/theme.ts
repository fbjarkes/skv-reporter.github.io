import { createTheme } from '@mui/material/styles';

export const myTheme = createTheme({
    typography: {
        fontFamily: 'Manrope, sans-serif',
        fontWeightRegular: 500,
        button: {
            fontSize: '14px',
            textTransform: 'none',
        },
    },
    palette: {
        //mode: prefersDarkMode ? 'dark' : 'light',
        mode: 'light',
        // primary: {
        //     light: '#E4F5FF',
        //     main: '#8BEAFF',
        //     dark: '#1D4DC9',
        //     contrastText: '#000',
        // },
        // secondary: {
        //     main: '#DD3E76',
        //     dark: '#750035',
        //     contrastText: '#E4F5FF',
        // },
        // warning: {
        //     main: '#FAC265',
        //     dark: '#D18641',
        //     contrastText: '#E4F5FF',
        // },
        // success: {
        //     main: '#51F39C',
        //     contrastText: '#E4F5FF',
        // },
        // error: {
        //     main: '#DD3E76',
        //     contrastText: '#8BEAFF',
        // },
        // info: {
        //     main: '#1D4DC9',
        //     contrastText: '#E4F5FF',
        // },
        // background: {
        //     paper: '#34343E',
        //     default: '#101017',
        // },
        // text: {
        //     primary: 'rgba(139, 234, 255, 0.9)',
        // },
    },
});

const defaultTheme = (prefersDarkMode: boolean) =>
    createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    });

export default defaultTheme;
