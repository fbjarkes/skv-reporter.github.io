import React, { useContext } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { calculateStats } from '../utils/helper';
import { TradeStats } from '../types/tradestats';
import { TradesContext } from '../contexts/trades-context';

const Footer: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);
    const stats = calculateStats(state.filteredTrades);

    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column" style={{ margin: theme.spacing(1, 1, 4, 1) }}>
                    <Typography>PF: {stats.profitFactor}</Typography>
                    <Typography>WinRate (%): {stats.winRate}</Typography>
                    <Typography>AvgWin: {stats.avgWin}</Typography>
                    <Typography>AvgLoss: {stats.avgLoss}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: theme.spacing(1, 1, 4, 1) }}>
                    <Typography>Total profits: {stats.totalWin}</Typography>
                    <Typography>Total losses: {stats.totalLoss}</Typography>
                    <Typography>Winners: {stats.winners}</Typography>
                    <Typography>Losers: {stats.losers}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
