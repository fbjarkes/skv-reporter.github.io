import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Button, Box, TextField, Checkbox, Typography, Slider} from '@material-ui/core';
import { TradeType } from '../types/trade';
import { TradesTable } from '../components/trades-table';
import { filterTrades } from '../utils/helper';
import parse from 'date-fns/parse';



const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(1, 1, 4, 1),
    },
    table: {
        margin: theme.spacing(1, 2, 0, 2),
    },        
    file: {
        padding: theme.spacing(2, 5, 0, 2),
        width: 300
    },
    dateFilter: {
        padding: theme.spacing(2, 5, 0, 2),
    },
    directionFilter: {
        padding: theme.spacing(2, 5, 0, 2),
    },
    typeFilter: {
        padding: theme.spacing(2, 5, 0, 2),
    },
    durationFilter: {
        padding: theme.spacing(2, 5, 0, 2),
        width: 400
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    filePanel: {
        width: 200,
    }
  }));


const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 30,
      label: '30',
    },
    {
        value: 60,
        label: '60',
    },
    {
        value: 100,
        label: 'All',
      },
  ];


interface HomeProps {
    trades: TradeType[];
    handleTrades(trades: TradeType[]): void;
}

const Home = (props: HomeProps) : any => {
    const classes = useStyles();    
    const [state, setState] = React.useState<any>({
        selectedFile: undefined,
        loaded: 0
    })
    // const [trades, setTrades] = React.useState<TradeType[]>([]);
    const [entryDateFilter, setEntryDateFilter] = React.useState<Date>();
    const [exitDateFilter, setExitDateFilter] = React.useState<Date>();
    const [durationFilter, setDurationFilter] = React.useState<number>(100);
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
            props.handleTrades([])
            // TODO: set status to error message?
        }

        if (response.status === 201) {              
            const trades = await response.json();
            // TODO: filter trades on checkbox states (LONG/SHORT only etc.)            
            // setTrades(trades);
            props.handleTrades(trades)
            // TODO: set informative status with number of trades etc.
        }

    };

    return (
        <>            
            <Grid container justify="center" direction="row">             
                <Grid item xs={12}>
                    <Box display="flex" className="classes.header">
                        <Box className="classes.filePanel" display="flex" flexDirection="column">
                            <Box className={classes.file}>
                                <label htmlFor="button-choose">
                                    <input id="button-choose" name="buttonChoose" style={{ display: 'none' }} type="file" onChange={handleChange} />
                                    <Button className="buttonChoose" variant="contained" component="span">Choose File</Button>
                                </label>
                            </Box>
                            <Box flexGrow={1} className={classes.file}>{state.selectedFile?.name ?? ''}</Box>                            
                        </Box>                        
                        <Box className={classes.dateFilter}>
                            <form className={classes.container} noValidate>
                                <TextField id="date" label="Entry Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => setEntryDateFilter(parse(e.target.value, 'yyyy-MM-dd', new Date()))}/>
                                <TextField id="date" label="Exit Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => setExitDateFilter(parse(e.target.value, 'yyyy-MM-dd', new Date()))}/>
                            </form>
                        </Box>
                        <Box className={classes.directionFilter} display="flex" flexDirection="column">                            
                            <FormControlLabel control={<Checkbox checked={filters.long} onChange={handleFiltersChange} name="long" color="primary" />} label="Long" />                            
                            <FormControlLabel control={<Checkbox checked={filters.short} onChange={handleFiltersChange} name="short" color="primary" />} label="Short" />
                            
                        </Box>
                        <Box className={classes.typeFilter} display="flex" flexDirection="column">
                            <FormControlLabel control={<Checkbox checked={filters.equities} onChange={handleFiltersChange} name="equities" color="primary" />} label="Equities" />
                            <FormControlLabel control={<Checkbox checked={filters.options} onChange={handleFiltersChange} name="options" color="primary" />} label="Options" />
                            <FormControlLabel control={<Checkbox checked={filters.futures} onChange={handleFiltersChange} name="futures" color="primary" />} label="Futures" />
                        </Box>
                        <Box className={classes.durationFilter} display="flex" width="30%" flexDirection="column" >
                            <Typography id="duration-slider" gutterBottom>Duration (min)</Typography>
                            <Slider defaultValue={durationFilter} valueLabelDisplay="auto" marks={marks} step={null} onChange={(e: any, value: number | number[]) => { setDurationFilter(value as number)}} />                            
                        </Box>                        
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <TradesTable data={props.trades.filter(t => filterTrades(t, filters, entryDateFilter, exitDateFilter, durationFilter))}/>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
