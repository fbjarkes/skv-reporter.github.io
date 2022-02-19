import React from 'react';
import Link from 'next/link';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        SKV Reporter
                    </Typography>
                    <Link href="/" passHref>
                        <Button color="inherit">Stat</Button>
                    </Link>
                    <Link href="/charts" passHref>
                        <Button color="inherit">Charts</Button>
                    </Link>
                    <Link href="/sru-download" passHref>
                        <Button color="inherit">SRU download</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
