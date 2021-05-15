import { DataGrid } from '@material-ui/data-grid';
import { ReactElement } from "react";
import { TradeType } from "../types/trade";

const columns = [
{ field: 'direction', headerName: 'L/S', width: 60 },    
{ field: 'symbol', headerName: 'Symbol', width: 130 },
{ field: 'quantity', headerName: 'Quantity', width: 70 },
{ field: 'entryPrice', headerName: 'Open price', width: 130 },
{ field: 'exitPrice', headerName: 'Close price', width: 130 },
{ field: 'entryDateTime', headerName: 'Entry date', width: 130 },
{ field: 'exitDateTime', headerName: 'Exit date', width: 130 },
// {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: any) =>
//     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
// },
];

interface TradeProps {
    data: TradeType[]
}

export const TradesTable = (props: TradeProps): ReactElement => {
    
    return (
        <>  
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={props.data} columns={columns} pageSize={10} checkboxSelection />
            </div>
        </>
    );
}