import Head from 'next/head'
import { useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import fb from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image'
import MainAppbar from '../components/mainAppbar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const auth = getAuth(fb)

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <Head>
        <title>Buy and trade virtual Land</title>
        <meta name="description" content="Buy and trade virtual Land" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainAppbar />
      {loading && (<div>loading...</div>)}
      <Box>
      <Paper sx={{minHeight: "450px", display: "flex",alignItems: 'center', p:5, justifyContent: 'center', backgroundSize: "cover", backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/highland-76a7d.appspot.com/o/virtual-land-sold-for-record-2-4-million-in-metaverse.jpg?alt=media&token=d1ecea69-d2a0-4f5b-9683-d54d62764991)"}}>
      <Typography variant="h4" gutterBottom component="div" sx={{color: "#fff", textShadow: "1px 1px 1px #000"}}>
        Buy and trade land in metaverse.
      </Typography>
      </Paper>
    </Box>

    </div>
  )
}
