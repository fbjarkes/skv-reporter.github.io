import React, { ChangeEvent, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, FormControlLabel, Button, Box, TextField, Checkbox, Typography, Slider } from '@mui/material';
import { TradeType } from '../types/trade';
// import { TradesTable } from '../components/trades-table';
// import { filterTrades } from '../utils/helper';
import parse from 'date-fns/parse';
import { ActionType, TradesContext } from '../contexts/trades-context';

const MyTextField = styled(TextField)(({ theme }) => ({
    //...theme.typography.body2,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    //color: theme.palette.text.secondary,
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

const Home: React.FC<{
    trades: TradeType[];
    filteredTrades: TradeType[];
    setTrades(trades: TradeType[]): void;
    setFilteredTrades(trades: TradeType[]): void;
}> = ({ trades, filteredTrades, setTrades, setFilteredTrades }) => {
    const { state, dispatch } = useContext(TradesContext);
    const [selectedFileName, setSelectedFileName] = React.useState<string>('');
    const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...state.tradeFilters, [event.target.name]: event.target.checked };
        dispatch({ type: ActionType.SetFilterAction, payload: newFilters });
    };
    const handleChange = async (event: any) => {
        const file = event.target.files[0];
        setSelectedFileName(file);
        const data = new FormData();
        data.append('fileName', file);
        const options = {
            method: 'POST',
            body: data,
        };

        const response = await fetch(`/api/uploadApi`, options);

        if (response.status === 500) {
            setTrades([]);
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
                    <Box display="flex" flexDirection="column" style={{ margin: '2em 2em 2em 2em' }}>
                        <Box style={{ width: 200 }}>
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
                        <Box flexGrow={1} style={{ width: 300 }}>
                            {selectedFileName}
                        </Box>
                    </Box>
                    <Box style={{ padding: '2em 5em 0em 2em' }}>
                        {/* TODO: form style? */}
                        <form noValidate style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <MyTextField
                                id="date"
                                label="Entry Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e: any) => {
                                    const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
                                    const f = { ...state.tradeFilters, start: d };
                                    dispatch({ type: ActionType.SetFilterAction, payload: f });
                                }}
                            />
                            <MyTextField
                                id="date"
                                label="Exit Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e: any) => {
                                    const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
                                    const f = { ...state.tradeFilters, end: d };
                                    dispatch({ type: ActionType.SetFilterAction, payload: f });
                                }}
                            />
                        </form>
                    </Box>
                    <Box display="flex" flexDirection="column" style={{ margin: '1em 0em 0em 0em' }}>
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
                    <Box display="flex" flexDirection="column" style={{ margin: '1em 0em 0em 0em' }}>
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
                    <Box
                        display="flex"
                        width="30%"
                        flexDirection="column"
                        style={{ width: '400px', padding: '1em 0em 0em 1em' }}
                    >
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
            <Grid item xs={12} style={{ margin: '2em 0em 5em 2em' }}>
                <div>TABLE HERE</div>
            </Grid>
        </>
    );
};

export default Home;
