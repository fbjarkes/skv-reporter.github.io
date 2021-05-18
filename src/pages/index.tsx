import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormGroup, FormControlLabel, Button, Box, TextField} from '@material-ui/core';
import styles from '../styles/Home.module.css';
import { TradeType } from '../types/trade';
import { TradesTable } from '../components/trades-table';
import { filter } from 'lodash';
import parse from 'date-fns/parse';


const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(1, 1, 4, 1),
    },
    table: {
        margin: theme.spacing(1, 2, 0, 2),
    },
    filters: {        
        display: 'flex',        
    },
    buttonUpload: {
        margin: theme.spacing(0, 2, 1, 0)
    },
    buttonChoose: {
        margin: theme.spacing(1, 0, 0, 0)
    },
    fileName: {
        padding: theme.spacing(1, 5, 0, 2)
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
  }));



const filterTrades = (t: TradeType, filters: any, start?: Date, end?: Date) : boolean=> {
    if (!filters.long && t.direction === 'LONG') {
        return false;
    }
    if (!filters.short && t.direction === 'SHORT') {
        return false;
    }
    if (!filters.options && t.securityType === 'OPT'){
        return false;
    }
    if (!filters.equities && t.securityType === 'STK'){
        return false;
    }
    if (!filters.futures && t.securityType === 'FUT'){
        return false;
    }
    
    
    if (start) {
        const tradeStart = parse(t.entryDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeStart < start) {
            return false;
        }
    }
    if (end) {
        const tradeEnd = parse(t.exitDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeEnd > end) {
            return false;
        }
    }
    
    return true;
}


const setTradeStats = (trades: TradeType[]) => {
    console.log('Stats for ', trades.length);
}

const Home = () : any => {
    const classes = useStyles();    
    const [state, setState] = React.useState<any>({
        selectedFile: undefined,
        loaded: 0
    })
    const [trades, setTrades] = React.useState<TradeType[]>([]);
    const [entryDateFilter, setEntryDateFilter] = React.useState<Date>();
    const [exitDateFilter, setExitDateFilter] = React.useState<Date>();
    const [filters, setFilters] = React.useState({
        long: true,
        short: true,
        equities: true,
        options: true,
        futures: true,
    });
    
    const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

     const handleChange = async (event: any) => {
        const file = event.target.files[0];                    
        setState({selectedFile: file, loaded: 0});   
        const data = new FormData();
        data.append('fileName', file);
        const options = {
            method: 'POST',
            body: data
        }

        const response = await fetch(`/api/uploadApi`, options); 
    
        if (response.status === 500) {
            setTrades([]);
            // TODO: set status to error message?
        }

        if (response.status === 201) {              
            const trades = await response.json();
            // TODO: filter trades on checkbox states (LONG/SHORT only etc.)            
            setTrades(trades);
            setTradeStats(trades);
            // TODO: set informative status with number of trades etc.
        }

    };

    return (
        <>            
            <Grid container justify="center" direction="row">             
                <Grid item xs={12} >
                    <Box display="flex" className={classes.main}>
                        <Box display="flex">
                            <label htmlFor="button-choose">
                                <input id="button-choose" name="buttonChoose" style={{ display: 'none' }} type="file" onChange={handleChange} />
                                <Button className="buttonChoose" variant="contained" component="span">Choose File</Button>
                            </label>
                            <Box flexGrow={1} className={classes.fileName}>{state.selectedFile?.name ?? ''}</Box>
                        </Box>                        
                        <Box display="flex" justifyContent="flex-end">
                            <form className={classes.container} noValidate>
                                <TextField id="date" label="Entry Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => setEntryDateFilter(parse(e.target.value, 'yyyy-MM-dd', new Date()))}/>
                                <TextField id="date" label="Exit Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => setExitDateFilter(parse(e.target.value, 'yyyy-MM-dd', new Date()))}/>
                            </form>
                        </Box>
                        {/* <Box display="flex" justifyContent="flex-end">
                            <FormControlLabel control={<Checkbox checked={filters.long} onChange={handleFiltersChange} name="long" color="primary" />} label="Long" />
                            <FormControlLabel control={<Checkbox checked={filters.short} onChange={handleFiltersChange} name="short" color="primary" />} label="Short" />
                            <FormControlLabel control={<Checkbox checked={filters.equities} onChange={handleFiltersChange} name="equities" color="primary" />} label="Equities" />
                            <FormControlLabel control={<Checkbox checked={filters.options} onChange={handleFiltersChange} name="options" color="primary" />} label="Options" />
                            <FormControlLabel control={<Checkbox checked={filters.futures} onChange={handleFiltersChange} name="futures" color="primary" />} label="Futures" />
                        </Box> */}
                    </Box>   
                </Grid>
                <Grid item xs={12}  >
                    <TradesTable data={trades.filter(t => filterTrades(t, filters, entryDateFilter, exitDateFilter))} onFilterChange={setTradeStats} />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
