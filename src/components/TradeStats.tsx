import React, { useContext } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { calculateStats } from '../utils/helper';

import { TradesContext } from '../contexts/TradesContext';

const TradeStats: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);
    const boxMargin = theme.spacing(1, 1, 4, 1);
    const stats = calculateStats(state.filteredTrades);
    return (
        <>
            <Box mt={2} mb={2}>
                <Box display="flex" justifyContent="center" gap={5}>
                    <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                        <Typography>Trades shown: {state.filteredTrades.length} </Typography>
                        <Typography>Total trades: {state.trades.length} </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" style={{ margin: boxMargin }}>
                        <Typography>PF: {stats.pf.toFixed(2)}</Typography>
                        <Typography>WinRate (%): {stats.winRate.toFixed(2)}</Typography>
                        <Typography>PnL: {stats.pnl.toFixed(2)}</Typography>
                        <Typography>Total Commissions: {stats.commissions.toFixed(2)}</Typography>
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
                <Box textAlign="center" mb={2}>
                    <Typography variant="body2" color="textSecondary">
                        Trade stats (USD only)
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default TradeStats;
