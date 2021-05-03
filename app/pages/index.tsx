import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

interface HomeProps {
    foo: string;
}

const Home = (props: HomeProps) => {
    return (
        <>
            <Head></Head>
            <Grid container>
                <Grid item xs={12} className={styles.headings}>
                    <Box p={5}>Grid 1</Box>
                </Grid>
                <Grid item xs={12}>
                    Grid 2
                </Grid>
                <Grid item xs={12}>
                    <Box pt={3}>Grid 3</Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
