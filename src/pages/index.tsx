import React, { ChangeEvent, useContext, useEffect } from 'react';
import { Grid, FormControlLabel, Button, Box, TextField, Checkbox, Typography, Slider } from '@mui/material';
import { TradeType } from '../types/trade';
// import { TradesTable } from '../components/trades-table';
// import { filterTrades } from '../utils/helper';
import parse from 'date-fns/parse';
import { ActionType, TradesContext } from '../trades-context';

// const useStyles = makeStyles((theme: any) => ({
//     file: {
//         padding: theme.spacing(2, 5, 0, 2),
//         width: 300
//     },
//     dateFilter: {
//         padding: theme.spacing(2, 5, 0, 2),
//     },
//     directionFilter: {
//         padding: theme.spacing(2, 5, 0, 2),
//     },
//     typeFilter: {
//         padding: theme.spacing(2, 5, 0, 2),
//     },
//     durationFilter: {
//         padding: theme.spacing(2, 5, 0, 2),
//         width: 400
//     },
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//     },
//     filePanel: {
//         width: 200,
//     },
//     table: {
//         margin: theme.spacing(0, 0, 5, 0),
//     }
//   }));

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
    filteredTrades: TradeType[];
    setTrades(trades: TradeType[]): void;
    setFilteredTrades(trades: TradeType[]): void;
}

const Home = (props: HomeProps) => {
    const { state, dispatch } = useContext(TradesContext);
    const [fileState, setFileState] = React.useState<any>({
        selectedFile: undefined,
        loaded: 0,
    });
    const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...state.tradeFilters, [event.target.name]: event.target.checked };
        dispatch({ type: ActionType.SetFilterAction, payload: newFilters });
    };

    const handleChange = async (event: any) => {
        const file = event.target.files[0];
        setFileState({ selectedFile: file, loaded: 0 });
        const data = new FormData();
        data.append('fileName', file);
        const options = {
            method: 'POST',
            body: data,
        };

        const response = await fetch(`/api/uploadApi`, options);

        if (response.status === 500) {
            props.setTrades([]);
            // TODO: set status to error message?
        }

        if (response.status === 201) {
            const trades = await response.json();
            dispatch({ type: ActionType.SetTradeAction, payload: trades });
        }
    };

    return (
        <>
            <Grid>
                <Box display="flex">
                    <Box display="flex" flexDirection="column">
                        <Box>
                            <input
                                id="button-choose"
                                name="buttonChoose"
                                style={{ display: 'none' }}
                                type="file"
                                onChange={handleChange}
                            />
                            <label htmlFor="button-choose">
                                <Button className="buttonChoose" variant="contained" component="span">
                                    Choose File
                                </Button>
                            </label>
                        </Box>
                    </Box>
                    <Box>
                        <form noValidate>
                            <TextField
                                id="date"
                                label="Entry Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e: any) => {
                                    const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
                                    // const f = { ... state.tradeFilters, start: d};
                                    //dispatch({type: ActionType.SetFilterAction, payload: f});
                                }}
                            />
                            <TextField
                                id="date"
                                label="Exit Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e: any) => {
                                    const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
                                    //  const f = { ... state.tradeFilters, end: d};
                                    //  dispatch({type: ActionType.SetFilterAction, payload: f});
                                }}
                            />
                        </form>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.tradeFilters.long}
                                    onChange={handleFiltersChange}
                                    name="long"
                                    color="primary"
                                />
                            }
                            label="Long"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.tradeFilters.short}
                                    onChange={handleFiltersChange}
                                    name="short"
                                    color="primary"
                                />
                            }
                            label="Short"
                        />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.tradeFilters.equities}
                                    onChange={handleFiltersChange}
                                    name="equities"
                                    color="primary"
                                />
                            }
                            label="Equities"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.tradeFilters.options}
                                    onChange={handleFiltersChange}
                                    name="options"
                                    color="primary"
                                />
                            }
                            label="Options"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.tradeFilters.futures}
                                    onChange={handleFiltersChange}
                                    name="futures"
                                    color="primary"
                                />
                            }
                            label="Futures"
                        />
                    </Box>
                    <Box display="flex" width="30%" flexDirection="column">
                        <Typography id="duration-slider" gutterBottom>
                            Duration (min)
                        </Typography>
                        <Slider
                            defaultValue={100}
                            valueLabelDisplay="auto"
                            marks={marks}
                            step={null}
                            onChange={(e: any, value: number | number[]) => {
                                dispatch({
                                    type: ActionType.SetFilterAction,
                                    payload: { ...state.tradeFilters, duration: value as number },
                                });
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <div>TABLE HERE</div>
            </Grid>
        </>
    );
};

// const Home = (props: HomeProps) : any => {
//     const { state, dispatch } = useContext(TradesContext);
//     const classes = useStyles();
//     const [fileState, setFileState] = React.useState<any>({
//         selectedFile: undefined,
//         loaded: 0
//     })

//     const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newFilters = { ...state.tradeFilters, [event.target.name]: event.target.checked };
//         dispatch({type: ActionType.SetFilterAction, payload: newFilters});
//     };

//     const handleChange = async (event: any) => {
//         const file = event.target.files[0];
//         setFileState({selectedFile: file, loaded: 0});
//         const data = new FormData();
//         data.append('fileName', file);
//         const options = {
//             method: 'POST',
//             body: data
//         }

//         const response = await fetch(`/api/uploadApi`, options);

//         if (response.status === 500) {
//             props.setTrades([])
//             // TODO: set status to error message?
//         }

//         if (response.status === 201) {
//             const trades = await response.json();
//             dispatch({type: ActionType.SetTradeAction, payload: trades})
//         }
//     };

//     return (
//         <>
//             <Grid container justify="center" direction="row">
//                 <Grid item xs={12}>
//                     <Box display="flex" className="classes.header">
//                         <Box className="classes.filePanel" display="flex" flexDirection="column">
//                             <Box className={classes.file}>
//                                 <label htmlFor="button-choose">
//                                     <input id="button-choose" name="buttonChoose" style={{ display: 'none' }} type="file" onChange={handleChange} />
//                                     <Button className="buttonChoose" variant="contained" component="span">Choose File</Button>
//                                 </label>
//                             </Box>
//                             <Box flexGrow={1} className={classes.file}>{fileState.selectedFile?.name ?? ''}</Box>
//                         </Box>
//                         <Box className={classes.dateFilter}>
//                             <form className={classes.container} noValidate>
//                                 <TextField id="date" label="Entry Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => {
//                                     const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
//                                     const f = { ... state.tradeFilters, start: d};
//                                     dispatch({type: ActionType.SetFilterAction, payload: f});
//                                 }}/>
//                                 <TextField id="date" label="Exit Date" type="date" className={classes.textField} InputLabelProps={{shrink: true }} onChange={(e) => {
//                                     const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
//                                     const f = { ... state.tradeFilters, end: d};
//                                     dispatch({type: ActionType.SetFilterAction, payload: f});
//                                 }}/>
//                             </form>
//                         </Box>
//                         <Box className={classes.directionFilter} display="flex" flexDirection="column">
//                             <FormControlLabel control={<Checkbox checked={state.tradeFilters.long} onChange={handleFiltersChange} name="long" color="primary" />} label="Long" />
//                             <FormControlLabel control={<Checkbox checked={state.tradeFilters.short} onChange={handleFiltersChange} name="short" color="primary" />} label="Short" />
//                         </Box>
//                         <Box className={classes.typeFilter} display="flex" flexDirection="column">
//                             <FormControlLabel control={<Checkbox checked={state.tradeFilters.equities} onChange={handleFiltersChange} name="equities" color="primary" />} label="Equities" />
//                             <FormControlLabel control={<Checkbox checked={state.tradeFilters.options} onChange={handleFiltersChange} name="options" color="primary" />} label="Options" />
//                             <FormControlLabel control={<Checkbox checked={state.tradeFilters.futures} onChange={handleFiltersChange} name="futures" color="primary" />} label="Futures" />
//                         </Box>
//                         <Box className={classes.durationFilter} display="flex" width="30%" flexDirection="column" >
//                             <Typography id="duration-slider" gutterBottom>Duration (min)</Typography>
//                             <Slider defaultValue={100} valueLabelDisplay="auto" marks={marks} step={null} onChange={(e: any, value: number | number[]) => {
//                                 dispatch({type: ActionType.SetFilterAction, payload: { ... state.tradeFilters, duration: value as number}});
//                             }} />
//                         </Box>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} className={classes.table} >
//                     <TradesTable />
//                 </Grid>
//             </Grid>
//         </>
//     );
// };

export default Home;
