import * as React from 'react';
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MainAppbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref><Typography variant="h6" component="div" sx={{ flexGrow: { xs: 1, md: 0 }}}>
            Highland
          </Typography></Link>
          <Box sx={{ flexGrow: 1, pl: 5, display: { xs: 'none', md: 'flex' }}}>
          <Link href="/about" passHref><Button color="inherit">About</Button></Link>
          <Link href="/buyLand" passHref><Button color="inherit">Buy Land</Button></Link>
          <Link href="/support" passHref><Button color="inherit">Support</Button></Link>
          </Box>
          <Link href="/login" passHref><Button color="inherit">Login</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
