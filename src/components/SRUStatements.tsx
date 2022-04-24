import React, { useContext } from 'react';
import { TradesContext } from '../contexts/TradesContext';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { StatementsTable } from './StatementsTable';

const SRUDownload: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);

    return (
        <>
            <Grid>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Box>SRU Statements</Box>
                </Box>
            </Grid>
            <Grid item xs={12} style={{ margin: theme.spacing(2, 0, 5, 2) }}>
                <StatementsTable statements={state.statements ?? []}></StatementsTable>
            </Grid>
        </>
    );
};

export default SRUDownload;
