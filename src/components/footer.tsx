import React, { FC, ReactElement } from 'react';
import style from '../styles/Footer.module.css';

const Footer: FC = ({}): ReactElement => {
    return (
        <>
            <div className={style.footer}>Stats ...</div>
            {/* <div className={style.footer}>Avg. Win: 0</div>
            <div className={style.footer}>Avg. Loss: 0</div> */}
        </>
    );
};

export default Footer;
