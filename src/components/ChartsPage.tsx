import React, { ReactElement, useContext } from 'react';

import { TradesContext } from '../contexts/TradesContext';
import Chart from './Chart';

const ChartsPage = (): ReactElement => {
    const { state } = useContext(TradesContext);
    const trades = state.filteredTrades ?? [];
    console.log('Calculating EQ curve based on trades:', trades.length);
    return (
        <>
            <div style={{ display: 'flex', height: 800, width: '100%', flexGrow: 1 }}>
                <Chart />
            </div>
        </>
    );
};

export default ChartsPage;
