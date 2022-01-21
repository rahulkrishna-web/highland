import Head from 'next/head'
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import fb from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image'
import  mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import { initializeMap } from "../map/initializeMap";
import MainAppbar from '../components/mainAppbar'

const auth = getAuth(fb)

mapboxgl.accessToken = "pk.eyJ1IjoicmFodWxrcmlzaG5hIiwiYSI6ImNreW83YnVobDBhdnYyb24yM2hhMGkyb2wifQ.JpccIkRnd-J96QgqrmYsxg";

export default function BuyLand() {
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.02, 38.887],
      zoom: 12.5,
      pitch: 45,
      maxBounds: [
        [-77.875588, 38.50705], // Southwest coordinates
        [-76.15381, 39.548764], // Northeast coordinates
      ],
    });

    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainAppbar />
      {loading && (<div>loading...</div>)}
      <div id="my-map" style={{ height: 500, width: "100%" }} />
      {user ? user.name : <pre>not authenticated</pre>}
      
    </div>
  )
}