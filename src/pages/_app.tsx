import ThemeProvider from '../theme/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Footer from '../components/footer';
import styles from '../styles/App.module.css';
import Header from '../components/header';
import { TradeType } from '../types/trade';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
    // const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden' })
    // useEffect(() => {
    //     const jssStyles = document.querySelector('#jss-server-side');
    //     if (jssStyles) {
    //         jssStyles.parentElement?.removeChild(jssStyles);
    //     }
    // }, []);
    const [trades, setTrades] = React.useState<TradeType[]>([]);
    
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement?.removeChild(jssStyles);
        }
      }, []);

    return (
        <>
            <div className={styles['app-container']}>
                <ThemeProvider>
                    <div className={styles['content-container']}>
                        <Header />
                        <Component {...pageProps} handleTrades={setTrades} trades={trades}/>
                    </div>
                    <Footer trades={trades}/>
                </ThemeProvider>
            </div>
        </>
    );
};

export default App;
