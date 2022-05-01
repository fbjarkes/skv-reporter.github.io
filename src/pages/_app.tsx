// import ThemeProvider from '../theme/ThemeProvider';
import React from 'react';
import { AppProps } from 'next/app';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import defaultTheme, { myTheme } from '../utils/theme';
import TradesProvider from '../contexts/TradesContext';
import Header from '../components/header';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => defaultTheme(prefersDarkMode), [prefersDarkMode]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <TradesProvider>
                    <Header />
                    <Component {...pageProps} />
                </TradesProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
