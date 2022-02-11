import React, { FC, ReactElement, useContext } from 'react';
import { Box, makeStyles, Theme, Typography } from '@mui/material';
import { TradeType } from '../types/trade';
import { calculateStats } from '../utils/helper';
import { TradeStats } from '../types/tradestats';
import { TradesContext } from '../contexts/trades-context';

interface FooterProps {
    trades?: TradeType[];
}

// const useStyles = makeStyles((theme: Theme) => ({
//     main: {
//         margin: theme.spacing(1, 1, 4, 1),
//     },
//     stats: {
//         margin: theme.spacing(2, 2, 0, 2),
//     }
//   }));

const Footer: FC<FooterProps> = (props: FooterProps): ReactElement => {
    // const classes = useStyles();
    const { state } = useContext(TradesContext);
    const stats = calculateStats(state.filteredTrades);

    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column">
                    <Typography>PF: {stats.profitFactor}</Typography>
                    <Typography>WinRate (%): {stats.winRate}</Typography>
                    <Typography>AvgWin: {stats.avgWin}</Typography>
                    <Typography>AvgLoss: {stats.avgLoss}</Typography>
                </Box>
                <Box display="flex" flexDirection="column">
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
