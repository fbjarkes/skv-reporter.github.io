import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormGroup, FormControlLabel, Button, Box, Checkbox} from '@material-ui/core';
import styles from '../styles/Home.module.css';
import { TradeType } from '../types/trade';
import { TradesTable } from '../components/trades-table';


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
    }
  }));



const Home = () : any => {
    const classes = useStyles();    
    const [state, setState] = React.useState({
        selectedFile: null,
        loaded: 0
    })
    const [trades, setTrades] = React.useState<TradeType[]>([]);
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

    const handleChange = (event: any) => {        
        //setState({ ...state, [event.target.name]: event.target.checked });
        console.log("Choose file event: ", event.target.files[0]);
        setState({selectedFile: event.target.files[0], loaded: 0});        
    };

    const submit = async (event: any): Promise<void> => {
        //event.preventDefault()
        console.log('Uploading file:', state.selectedFile);
        const data = new FormData();
        data.append('fileName', state.selectedFile);
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
            // TODO: set informative status with number of trades etc.
        }
    }

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
                            <Box flexGrow={1} className={classes.fileName}>{state.selectedFile === null ? '' : state.selectedFile.name}</Box>
                            <Button variant="contained" onClick={submit} className={classes.buttonUpload} disabled={!state.selectedFile}>Upload</Button>                             
                        </Box>                        
                        <Box display="flex" justifyContent="flex-end">
                            <FormControlLabel control={<Checkbox checked={filters.long} onChange={handleFiltersChange} name="long" color="primary" />} label="Long" />
                            <FormControlLabel control={<Checkbox checked={filters.short} onChange={handleFiltersChange} name="short" color="primary" />} label="Short" />
                            <FormControlLabel control={<Checkbox checked={filters.equities} onChange={handleFiltersChange} name="equities" color="primary" />} label="Equities" />
                            <FormControlLabel control={<Checkbox checked={filters.options} onChange={handleFiltersChange} name="options" color="primary" />} label="Options" />
                            <FormControlLabel control={<Checkbox checked={filters.futures} onChange={handleFiltersChange} name="futures" color="primary" />} label="Futures" />
                        </Box>
                    </Box>   
                </Grid>
                <Grid item xs={12}  >
                    <TradesTable data={trades} />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
