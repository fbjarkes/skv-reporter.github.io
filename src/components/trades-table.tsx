import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from "react";
import { TradeType } from "../types/trade";
import styles from '../styles/Home.module.css';

const useStyles = makeStyles((theme) => ({    
    table: {
        margin: theme.spacing(1, 2, 0, 2),
    }
  }));


const columns = [   
    { field: 'id', headerName: 'id', width: 80 },
    { field: 'symbol', headerName: 'Symbol', width: 200 },
    { field: 'quantity', headerName: 'Qty', width: 100 },
    { field: 'entryPrice', headerName: 'Open', width: 130 },
    { field: 'exitPrice', headerName: 'Close', width: 130 },
    { field: 'pnl', headerName: 'PnL', width: 120, type: 'number' },
    { field: 'entryDateTime', headerName: 'Entry date', width: 150, type: 'date'},
    { field: 'exitDateTime', headerName: 'Exit date', width: 150, type: 'date' },
    { field: 'direction', headerName: 'L/S', width: 82 }, 
    { field: 'securityType', headerName: 'Type', width: 120 }, 
];

interface TradeProps {
    data: TradeType[]
    onFilterChange(trade: TradeType[]): void
}


export const TradesTable = (props: TradeProps): ReactElement => {
    const classes = useStyles();    

    const filterChange = (data: any) => {
        const trades = Array.from(data.visibleRows.values()) as TradeType[];
        props.onFilterChange(trades);
    }
    const tester = () => {
        console.log('HERE');
    }
    
    return (
        <>  
            <div style={{ display: 'flex', height: 800,  width: '100%', flexGrow: 1 }}>
                <DataGrid rows={props.data} columns={columns} pageSize={100} checkboxSelection className={classes.table} onFilterModelChange={filterChange} onPageChange={tester} />
            </div>
        </>
    );
}