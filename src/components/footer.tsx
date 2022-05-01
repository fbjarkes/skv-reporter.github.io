import React, { useContext } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { calculateStats } from '../utils/helper';

import { TradesContext } from '../contexts/TradesContext';

const Footer: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);

    const stats = calculateStats(state.filteredTrades);
    const boxMargin = theme.spacing(1, 1, 4, 1);

    return (
        <>
            <Box display="flex" justifyContent="center">
                Trade stats (USD only)
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>Trades shown: {state.filteredTrades.length} </Typography>
                    <Typography>Total tradesYYYY: {state.trades.length} </Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>PF: {stats.pf.toFixed(2)}</Typography>
                    <Typography>WinRate (%): {stats.winRate.toFixed(2)}</Typography>
                    <Typography>PnL: {stats.pnl.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>Winners: {stats.winners.toFixed(0)}</Typography>
                    <Typography>Losers: {stats.losers.toFixed(0)}</Typography>
                    <Typography>AvgWin: {stats.avgWin.toFixed(2)}</Typography>
                    <Typography>AvgLoss: {stats.avgLoss.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>Avg. holding time winner : 0 </Typography>
                    <Typography>Avg. holding time loser : 0 </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
