import ThemeProvider from '../theme/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/App.module.css';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
    // const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden' })
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <div className={styles['app-container']}>
                <ThemeProvider>
                    <div className={styles['content-container']}>
                        <Header />
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </ThemeProvider>
            </div>
        </>
    );
};

export default App;
