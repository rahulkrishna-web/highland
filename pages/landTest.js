import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; 
import * as turf from '@turf/turf'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import MainAppbar from '../components/mainAppbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

mapboxgl.accessToken = "pk.eyJ1IjoicmFodWxrcmlzaG5hIiwiYSI6ImNreW83YnVobDBhdnYyb24yM2hhMGkyb2wifQ.JpccIkRnd-J96QgqrmYsxg";


function LandTest() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-82.659521999370077); // eslint-disable-line no-unused-vars
  const [lat, setLat] = useState(9.628698847753714); // eslint-disable-line no-unused-vars
  const [zoom, setZoom] = useState(17); // eslint-disable-line no-unused-vars
  const [flag, setFlag] = useState(false); // eslint-disable-line no-unused-vars
  const [tiles,setTiles] = useState([]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: true
    });

    const bounds = map.current.getBounds();

    console.log(`bounds:`, bounds);

    const NE = bounds.getNorthEast();
    const SW = bounds.getSouthWest();

    var cellSide = 0.01;
    var grid = turf.squareGrid([SW.lng, SW.lat, NE.lng, NE.lat], cellSide, 'kilometers');

    console.log(`squareGrid - before:`, grid);

    // Set all features to highlighted == 'No'
    for (let i = 0; i < grid.features.length; i++) {
      grid.features[i].properties.highlighted = 'No';
      grid.features[i].properties.id = i;
    }

    console.log(`squareGrid - after:`, grid);

    map.current.on('load', () => {
      console.log(`-- Loaded --`);
      map.current.addSource('grid-source', {
        'type': "geojson",
        'data': grid,
        'generateId': true
      });
      map.current.addLayer(
        {
          'id': 'grid-layer',
          'type': 'fill',
          'source': 'grid-source',
          'paint': {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
          }
        }
      );
      map.current.addLayer(
        {
          'id': 'grid-layer-highlighted',
          'type': 'fill',
          'source': 'grid-source',
          'paint': {
            'fill-outline-color': '#484896',
            'fill-color': '#fff',
            'fill-opacity': 0.75
          },
          //'filter': ['==', ['get', 'highlighted'], 'Yes']
          'filter': ['==', ['get', 'id'], -1]
        }
      );
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
        }));
        const nav = new mapboxgl.NavigationControl();
          map.current.addControl(nav, 'bottom-right');
      //click action
      
    });
    map.current.on('click', 'grid-layer', function (e) {
      var selectIndex = e.features[0].id;
      setTiles([...tiles,selectIndex])
      grid.features[e.features[0].id].properties.highlighted = 'Yes';
      e.features[0].properties.highlighted = 'Yes';
      //this! 무야호!
      const filter = ['==', ['number', ['get', 'id']], selectIndex];

      map.current.setFilter('grid-layer-highlighted', filter);
    });
    
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <MainAppbar />
      <div ref={mapContainer} className="map-container" />
      <Box sx={{ flexGrow: 1, mt: 2, px: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
          <Typography variant="h4" gutterBottom component="div">
        Location
      </Typography>
      <Typography variant="body 2" gutterBottom component="div">
        Address
      </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
          <Typography variant="button" display="block" gutterBottom>
        Tiles : {tiles.length}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        Market Value : $200
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
      (PER TILE: $8.542)
      </Typography>
          <Button variant="contained">Buy Now</Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default LandTest;