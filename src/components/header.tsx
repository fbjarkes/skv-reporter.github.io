import React, { ReactElement, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles({
    
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {

    },
    toolbarContent: {

    }
});

export const Header = (): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} variant="dense">
                    <Typography variant="h6" className={classes.title}>
                    SKV Reporter
                    </Typography>
                    <div className={classes.toolbarContent}> 
                        <Link href="/">
                            <Button color="inherit">
                                Stat
                            </Button>
                        </Link>
                        <Link href="/sru">
                            <Button color="inherit">
                                SRU download
                            </Button>
                        </Link>                  
                    </div>
                
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
