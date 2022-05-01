import { ReactElement, useContext } from 'react';
import { TradesContext } from '../contexts/TradesContext';
import { K4_TYPE, Statement } from '../types/statement';
import { DataGrid } from '@mui/x-data-grid';

// const useStyles = makeStyles((theme) => ({
//     table: {
//         margin: theme.spacing(1, 2, 0, 2),
//     }
//   }));

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'quantity', headerName: 'Qty', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 400 },
    { field: 'received', headerName: 'Received', width: 130 },
    { field: 'paid', headerName: 'Paid', width: 130 },
    { field: 'pnl', headerName: 'PnL', width: 120, type: 'number' },
    {
        field: 'type',
        headerName: 'K4 Type',
        width: 100,
    },
    //{ field: 'exitDateTime', headerName: 'Exit date', width: 150, type: 'date' },
];

export const StatementsTable: React.FC<{ statements: Statement[] }> = ({ statements }) => {
    console.log('Rendering with ', statements.length);
    return (
        <>
            <div style={{ display: 'flex', height: 800, width: '100%', flexGrow: 1 }}>
                <DataGrid rows={statements} columns={columns} pageSize={100} checkboxSelection />
            </div>
        </>
    );
};
