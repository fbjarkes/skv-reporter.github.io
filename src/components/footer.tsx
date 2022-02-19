import React, { useContext } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { calculateStats } from '../utils/helper';
// import { TradeStats } from '../types/tradestats';
import { TradesContext } from '../contexts/TradesContext';


const Footer: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);
    const stats = calculateStats(state.filteredTrades);

    const boxMargin = theme.spacing(1, 1, 4, 1);

    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>Trades shown: 0 </Typography>
                    <Typography>Total trades: 0 </Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>PF: {stats.profitFactor}</Typography>
                    <Typography>WinRate (%): {stats.winRate}</Typography>
                    <Typography>Total profits: {stats.totalWin}</Typography>
                    <Typography>Total losses: {stats.totalLoss}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                    <Typography>Winners: {stats.winners}</Typography>
                    <Typography>Losers: {stats.losers}</Typography>
                    <Typography>AvgWin: {stats.avgWin}</Typography>
                    <Typography>AvgLoss: {stats.avgLoss}</Typography>
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
