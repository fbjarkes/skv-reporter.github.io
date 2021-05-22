import React, { FC, ReactElement } from 'react';
import style from '../styles/Footer.module.css';
import { TradeType } from '../types/trade';


interface FooterProps {
    trades: TradeType[]
}


const Footer: FC<FooterProps> = (props: FooterProps): ReactElement => {
    const trades = props.trades;
    return (
        <>
            <div className={style.footer}>Stats for {trades.length}</div>
            {/* <div className={style.footer}>Avg. Win: 0</div>
            <div className={style.footer}>Avg. Loss: 0</div> */}
        </>
    );
};

export default Footer;
