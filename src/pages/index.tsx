export { default } from '../components/MainPage';

// import React, { ChangeEvent, useContext, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Grid, FormControlLabel, Button, Box, TextField, Checkbox, Typography, Slider } from '@mui/material';
// import { TradeType } from '../types/trade';
// import { TradesTable } from '../components/TradesTable';
// // import { filterTrades } from '../utils/helper';
// import parse from 'date-fns/parse';
// import { ActionType, TradesContext } from '../contexts/TradesContext';

// const MyTextField = styled(TextField)(({ theme }) => ({
//     //...theme.typography.body2,
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//     //color: theme.palette.text.secondary,
// }));

// const marks = [
//     {
//         value: 1,
//         label: '1',
//     },
//     {
//         value: 5,
//         label: '5',
//     },
//     {
//         value: 10,
//         label: '10',
//     },
//     {
//         value: 30,
//         label: '30',
//     },
//     {
//         value: 60,
//         label: '60',
//     },
//     {
//         value: 100,
//         label: 'All',
//     },
// ];

// const Home: React.FC<{
//     trades: TradeType[];
//     filteredTrades: TradeType[];
//     setTrades(trades: TradeType[]): void;
//     setFilteredTrades(trades: TradeType[]): void;
// }> = ({ trades, filteredTrades, setTrades, setFilteredTrades }) => {
//     const theme = useTheme();
//     const { state, dispatch } = useContext(TradesContext);
//     const [selectedFileName, setSelectedFileName] = React.useState<string>('');
//     const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newFilters = { ...state.tradeFilters, [event.target.name]: event.target.checked };
//         dispatch({ type: ActionType.SetFilterAction, payload: newFilters });
//     };
//     const uploadFile = async (event: React.BaseSyntheticEvent) => {
//         console.log('uploadFile', event);
//         const file = event.target.files[0];
//         console.log(file);
//         setSelectedFileName(file.name);
//         const data = new FormData();
//         data.append('file', file);
//         const options = {
//             method: 'POST',
//             body: data,
//         };

//         const response = await fetch(`/api/uploadApi`, options);

//         if (response.status === 500) {
//             dispatch({ type: ActionType.SetTradeAction, payload: [] });
//             // TODO: set status to error message?
//         }

//         if (response.status === 201) {
//             const trades = await response.json();
//             dispatch({ type: ActionType.SetTradeAction, payload: trades });
//         }
//     };

//     return (
//         <>
//             <Grid>
//                 <Box display="flex">
//                     <Box display="flex" flexDirection="column" style={{ margin: theme.spacing(2, 2, 2, 2) }}>
//                         <Box style={{ width: 200 }}>
//                             <input
//                                 id="button-choose"
//                                 name="buttonChoose"
//                                 style={{ display: 'none' }}
//                                 type="file"
//                                 onChange={uploadFile}
//                             />
//                             <label htmlFor="button-choose">
//                                 <Button className="buttonChoose" variant="contained" component="span">
//                                     Choose File
//                                 </Button>
//                             </label>
//                         </Box>
//                         <Box flexGrow={1} style={{ width: 300 }}>
//                             {selectedFileName}
//                         </Box>
//                     </Box>
//                     <Box style={{ padding: '2em 5em 0em 2em' }}>
//                         {/* TODO: form style? */}
//                         <form noValidate style={{ display: 'flex', flexWrap: 'wrap' }}>
//                             <MyTextField
//                                 id="date"
//                                 label="Entry Date"
//                                 type="date"
//                                 InputLabelProps={{ shrink: true }}
//                                 onChange={(e) => {
//                                     const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
//                                     const f = { ...state.tradeFilters, start: d };
//                                     dispatch({ type: ActionType.SetFilterAction, payload: f });
//                                 }}
//                             />
//                             <MyTextField
//                                 id="date"
//                                 label="Exit Date"
//                                 type="date"
//                                 InputLabelProps={{ shrink: true }}
//                                 onChange={(e) => {
//                                     const d = parse(e.target.value, 'yyyy-MM-dd', new Date());
//                                     const f = { ...state.tradeFilters, end: d };
//                                     dispatch({ type: ActionType.SetFilterAction, payload: f });
//                                 }}
//                             />
//                         </form>
//                     </Box>
//                     <Box display="flex" flexDirection="column" style={{ margin: theme.spacing(1, 0, 0, 0) }}>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={state.tradeFilters.long}
//                                     onChange={handleFiltersChange}
//                                     name="long"
//                                     color="primary"
//                                 />
//                             }
//                             label="Long"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={state.tradeFilters.short}
//                                     onChange={handleFiltersChange}
//                                     name="short"
//                                     color="primary"
//                                 />
//                             }
//                             label="Short"
//                         />
//                     </Box>
//                     <Box display="flex" flexDirection="column" style={{ margin: theme.spacing(1, 0, 0, 0) }}>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={state.tradeFilters.equities}
//                                     onChange={handleFiltersChange}
//                                     name="equities"
//                                     color="primary"
//                                 />
//                             }
//                             label="Equities"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={state.tradeFilters.options}
//                                     onChange={handleFiltersChange}
//                                     name="options"
//                                     color="primary"
//                                 />
//                             }
//                             label="Options"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={state.tradeFilters.futures}
//                                     onChange={handleFiltersChange}
//                                     name="futures"
//                                     color="primary"
//                                 />
//                             }
//                             label="Futures"
//                         />
//                     </Box>
//                     <Box
//                         display="flex"
//                         width="30%"
//                         flexDirection="column"
//                         style={{ width: '400px', padding: theme.spacing(2, 0, 0, 1) }}
//                     >
//                         <Typography id="duration-slider" gutterBottom>
//                             Duration (min)
//                         </Typography>
//                         <Slider
//                             defaultValue={100}
//                             valueLabelDisplay="auto"
//                             marks={marks}
//                             step={null}
//                             onChange={(_e, value: number | number[]) => {
//                                 // TODO: useCallback() here?
//                                 dispatch({
//                                     type: ActionType.SetFilterAction,
//                                     payload: { ...state.tradeFilters, duration: value as number },
//                                 });
//                             }}
//                         />
//                     </Box>
//                 </Box>
//             </Grid>
//             <Grid item xs={12} style={{ margin: theme.spacing(2, 0, 5, 2) }}>
//                 <TradesTable />
//             </Grid>
//         </>
//     );
// };

// export default Home;
