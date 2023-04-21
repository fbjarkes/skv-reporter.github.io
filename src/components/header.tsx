import React, { useState } from 'react';
import Link from 'next/link';
import { styled, useTheme, withStyles } from '@mui/material/styles';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

interface StyledButtonProps {
    theme: any;
    selected: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ selected, theme }) => ({
    backgroundColor: selected ? theme.palette.button.default : 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.button.default,
    },
}));

export const Header = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const theme = useTheme();
    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        SKV Reporter
                    </Typography>
                    <Link href="/" passHref>
                        <StyledButton theme={theme} selected={selectedItem === 0} onClick={() => handleItemClick(0)}>
                            Stat
                        </StyledButton>
                    </Link>
                    <Link href="/charts" passHref>
                        <StyledButton theme={theme} selected={selectedItem === 1} onClick={() => handleItemClick(1)}>
                            Charts
                        </StyledButton>
                    </Link>
                    <Link href="/sru-statements" passHref>
                        <StyledButton theme={theme} selected={selectedItem === 2} onClick={() => handleItemClick(2)}>
                            SRU Statements
                        </StyledButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
