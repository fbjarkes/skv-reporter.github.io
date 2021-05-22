import React, { ReactElement} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TradeType } from "../types/trade";




interface SRUDownloadProps {
    trades: TradeType[]
}

const useStyles = makeStyles({
    
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {

    },
    toolbarContent: {

    }
});

const SRUDownload = (props: SRUDownloadProps): ReactElement => {
    const classes = useStyles();
    const trades = props.trades;
    return (
        <>
            <div className={classes.root}>
                <Typography>SRU Download</Typography>
            </div>            
        </>
    );
};

export default SRUDownload
