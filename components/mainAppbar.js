import React, { useEffect, useState } from "react";
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
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectWallet = () => {
    setCurrentAccount("");
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

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
          <Link href="/landTest" passHref><Button color="inherit">Buy Land</Button></Link>
          <Link href="/support" passHref><Button color="inherit">Support</Button></Link>
          </Box>
          {!currentAccount && (<Button color="inherit" onClick={connectWallet}>Connect Wallet</Button>)}
          {currentAccount && (<Button color="inherit" onClick={disconnectWallet}>Disconnect Wallet</Button>)}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
