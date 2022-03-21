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
    <Box sx={{px: 2, my: 2}}>
      <Paper sx={{p: 2}}>
      <Typography variant="body1" gutterBottom>
    Our Current world is a mix bag of real and virtual. The future we see will be primarily virtual.<br/><br/>

In this technically driven age , technology  is changing and moving forward  at an immense pace. We all are witnessing more and more science fictions as virtual media which we think might turn into reality soon.
<br/><br/>
In the existing time we are already spending half of our time on social media and on other social platform. We also see more virtual realities coming into existence. 
<br/><br/>
There’s a long road ahead of us, as a new virtual future is slowly becoming more as a reality, but it may not be as long as we think.We strongly believe that we are creating the stepping stone by laying the foundation of a virtual real estate meta world.
<br/><br/>
We are providing the opportunity to people to be a part of this virtual real estate meta world future as we are launching this Alpha platform where you can be a founding brick owner of this new future. 
      </Typography>
      </Paper>
    
    </Box>

    </div>
  )
}
