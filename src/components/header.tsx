import React, { ReactElement, useContext } from 'react';
import Link from 'next/link';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

// const useStyles = makeStyles({

//     root: {
//         flexGrow: 1,
//     },
//     title: {
//         flexGrow: 1,
//     },
//     toolbar: {

//     },
//     toolbarContent: {

//     }
// });

export const Header = (): ReactElement => {
    // const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6">SKV Reporter</Typography>
                    <div>
                        <Link href="/">
                            <Button color="inherit">Stat</Button>
                        </Link>
                        <Link href="/sru-download">
                            <Button color="inherit">SRU download</Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
