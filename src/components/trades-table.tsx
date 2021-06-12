import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, useContext } from "react";
import { TradeType } from "../types/trade";
import styles from '../styles/Home.module.css';
import { TradesContext } from '../trades-context';

const useStyles = makeStyles((theme) => ({    
    table: {
        margin: theme.spacing(1, 2, 0, 2),
    }
  }));


const columns = [   
    { field: 'positionId', headerName: 'Trade', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 200 },
    { field: 'quantity', headerName: 'Qty', width: 100 },
    { field: 'entryPrice', headerName: 'Open', width: 130 },
    { field: 'exitPrice', headerName: 'Close', width: 130 },
    { field: 'pnl', headerName: 'PnL', width: 120, type: 'number' },
    { field: 'entryDateTime', headerName: 'Entry date', width: 150, type: 'date'},
    { field: 'exitDateTime', headerName: 'Exit date', width: 150, type: 'date' },
    { field: 'durationMin', headerName: 'Duration', width: 140, type: 'number' }, 
    { field: 'direction', headerName: 'L/S', width: 82 }, 
    { field: 'securityType', headerName: 'Type', width: 120 }, 
];

interface TradeProps {
    data?: TradeType[]
}


export const TradesTable = (props: TradeProps): ReactElement => {
    const classes = useStyles();
    const { state } = useContext(TradesContext);    
    // const trades = props.data ?? [];
    const trades = state.filteredTrades ?? [];
    console.log("Rendering with ", trades.length);
    return (
        <>  
            <div style={{ display: 'flex', height: 800,  width: '100%', flexGrow: 1 }}>
                <DataGrid rows={trades} columns={columns} pageSize={100} checkboxSelection className={classes.table} />
            </div>
        </>
    );
}