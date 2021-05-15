import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormGroup, FormControlLabel, Button} from '@material-ui/core';
import styles from '../styles/Home.module.css';
import { promises as fs } from 'fs';
import { TradeType } from '../types/trade';
import { TradesTable } from '../components/trades-table';

interface HomeProps {
    foo: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));



const Home = (props: HomeProps) => {
    const classes = useStyles();    
    const [state, setState] = React.useState({
        selectedFile: '',
        loaded: 0
    })
    const [trades, setTrades] = React.useState<TradeType[]>([]);

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
                <Grid item xs={12}>
                    <FormGroup row>
                        {/* <FormControlLabel labelPlacement="start" label="LONG:" control={<Checkbox checked={state.checkedLong} onChange={handleChange} name="checkedLong" />} />
                        <FormControlLabel labelPlacement="start" label="SHORT:" control={<Checkbox checked={state.checkedShort} onChange={handleChange} name="checkedShortc" />} /> */}
                        <input type="file" name="file" onChange={handleChange} />
                        <Button variant="contained" onClick={submit}>Upload</Button>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <TradesTable data={trades}/>
                </Grid>
  
            </Grid>
        </>
    );
};

export default Home;
