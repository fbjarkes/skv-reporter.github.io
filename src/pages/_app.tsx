// import ThemeProvider from '../theme/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from '../theme';
// import Footer from '../components/footer';
// import styles from '../styles/App.module.css';
// import Header from '../components/header';
// import TradesProvider from '../trades-context';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => defaultTheme(prefersDarkMode), [prefersDarkMode]);

    return (
        <>
            <div>
                <div>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                        {/* <TradesProvider>
                                <Header />
                                <Component {...pageProps} />
                                <Footer />
                            </TradesProvider> */}
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
};

export default App;
