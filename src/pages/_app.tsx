// import ThemeProvider from '../theme/ThemeProvider';
import React from 'react';
import { AppProps } from 'next/app';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import defaultTheme, { myTheme } from '../utils/theme';
import Footer from '../components/footer';
import Header from '../components/header';
// import TradesProvider from '../trades-context';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => defaultTheme(prefersDarkMode), [prefersDarkMode]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Component {...pageProps} />
                <Footer />
                {/* <TradesProvider>
                                <Header />
                                <Component {...pageProps} />
                                <Footer />
                            </TradesProvider> */}
            </ThemeProvider>
        </>
    );
};

export default App;
