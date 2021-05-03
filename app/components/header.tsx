import React, { ReactElement, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
    show: {
        transform: 'translateY(0)',
        transition: 'transform .5s',
    },
    hide: {
        transform: 'translateY(-110%)',
        transition: 'transform .5s',
    },
    toolbar: {
        paddingLeft: '5%',
    },
    toolbarContent: {
        paddingLeft: 70,
    },
    toolbarRight: {
        right: 0,
        position: 'absolute',
        paddingRight: '5%',
    },
});

export const Header = (): ReactElement => {
    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarContent}>
                    <Link href="/">
                        <Button variant="text" color="inherit">
                            Home
                        </Button>
                    </Link>
                    <Link href="/Stuff">
                        <Button variant="text" color="inherit">
                            Stuff
                        </Button>
                    </Link>
                </div>
                {/* <div className={classes.toolbarRight}>
             
        </div> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
