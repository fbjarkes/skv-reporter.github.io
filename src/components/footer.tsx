import React, { FC, ReactElement, useContext } from 'react';
import { Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TradeType } from '../types/trade';
import { calculateStates } from '../utils/helper';
import { TradeStats } from '../types/tradestats';


interface FooterProps {
    trades?: TradeType[]
}

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(1, 1, 4, 1),
    },
    stats: {
        margin: theme.spacing(2, 2, 0, 2),
    }
  }));

const Footer: FC<FooterProps> = (props: FooterProps): ReactElement => {

    const classes = useStyles();    
    // const trades = props.trades;
    // const stats = calculateStates(trades);
    const stats = new TradeStats();

    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column" className={classes.stats}>
                    <Typography>PF: {stats.profitFactor}</Typography>
                    <Typography>WinRate (%): {stats.winRate}</Typography>
                    <Typography>AvgWin: {stats.avgWin}</Typography>
                    <Typography>AvgLoss: {stats.avgLoss}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" className={classes.stats}>
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
