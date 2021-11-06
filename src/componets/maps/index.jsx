/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
import mapboxgl from '!mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ydGl6dmVnYSIsImEiOiJja3UwamVqcnUwdmFsMnZvdzUzNm9wMThxIn0.aFhueiPPoBznn4aWpkMAmA';

import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid  from '@mui/material/Grid';
import Alert from '../../common/alert';
import Painterro from 'painterro';
import getRoute from './route';
import style from '../style/map';
import Waypoint from '../planroute/waypoint';
//https://npm.io/package/painterro

import { createRouteStorage, saveWaypointStorage } from '../../storage/planroute';
const colors = ['#079CF7', '#07ED88', '#F03724', '#51F707', '#EDAB07'];

function MapPlanRoute(props) {
    // eslint-disable-next-line react/prop-types
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-74.1447);
    const [lat, setLat] = useState(4.63333);
    const [zoom, setZoom] = useState(12);
    const [openModal, setOpenModal] = useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [message, getMessage] = React.useState('Error al crear waypoint');
    const [currentMarker, setCurrentMarker] = useState(null);
    const [canSave, setCanSave] = useState(null);
    const addWaypoint = () => {
        const marker = new mapboxgl.Marker({
            draggable: true,
            color:colors[(Math.random() * colors.length) | 0]
        }).setLngLat([map.current.getCenter().lng, map.current.getCenter().lat])
        // eslint-disable-next-line react/prop-types
            .setPopup(new mapboxgl.Popup().setHTML(`<h1>Waypoint ${props.waypoints.current.length + 1}</h1>`))
            .addTo(map.current);
        marker.getPopup().on('click',(mark)=> {
            console.log('here');
        });
        setCurrentMarker(marker);
    };
    const getSnack=()=>{ 
        return openSnack;
    };
    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    const saveData = (dataImage) => {
        console.log('dataimage',dataImage);
    };
    const handleOpen = () => {
        Painterro({
            asDataURL: saveData,
            language: 'es'  // Spanish
        }).show(); 
        // setOpenModal(true);
    };
    const handleClose = () => {
        //console.log('here');
        setOpenModal(false);
    };
    const addMarker = (distance,image) => {
        props.waypoints.current.push(currentMarker);
        saveWaypointStorage('route', props.waypoints.current.length,
            JSON.stringify({
                distance: distance,
                position: currentMarker._lngLat,
                image:image
            })
        );
        loadWaypoints();
        
    };
    const deleteWaypoint = () => {
        if (props.waypoints.current.length > 1) {
            deleteLayer(props.waypoints.current.length - 1);
            props.waypoints.current.pop();
            setCurrentMarker(props.waypoints.current[props.waypoints.current.length-1]);	 	
        }
        if (currentMarker != null) {
            console.log('marker');
            currentMarker.remove();	
            
        }
    };
    const showWaypoint = () => {
        localStorage.clear();
    };
  
    const saveWaypoint = () => {
        if (!currentMarker) { 
            handleClickSnack();
            return;
        }
        return showPainter();   
        
    };
    const  getDistance= async()=>{
        if (props.waypoints.current.length < 1) {
            return 0;
        }
        console.log('draw');
        return await getRoute(
            currentMarker._lngLat,
            props.waypoints.current[props.waypoints.current.length - 1]._lngLat,
            map.current,
            props.waypoints.current.length);
    };
    async function newRoute() { 
        const distance = await getRoute(
            currentMarker._lngLat,
            props.waypoints.current[props.waypoints.current.length - 1]._lngLat,
            map.current,
            props.waypoints.current.length);
        handleOpen();
        //addMarker(distance);
        //setCurrentMarker(null);
    }
    const showPainter = () => {
        Painterro({
            language: 'es' , // Spanish
            saveHandler: saveImage
        }).show(); 
    };
    const saveImage = async (image, done) => { 
        const distance = await getDistance();
        addMarker(distance, image.asDataURL());
        //props.loadWaypoints();
        return done(true);
    };
    const deleteLayer=(id)=>{ 
        map.current.removeLayer(`route-${id}`);
    };
    const loadWaypoints = () => (
        <Paper>
            {[].map((point, index) => (<Waypoint key={index} />))}
        </Paper >
    );
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true,
            capturePointerMove:true
            
        }));
      
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        map.current.on('dblclick', (e) => {
            console.log(`A dblclick event has occurred at ${e.lngLat}`);
        });
        map.current.on('dblclick', 'poi-label', (e) => {
            console.log(`A dblclick event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`);
        });
    });
   
    return (
        <React.Fragment>
          
            <div>
                <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div className='center'><div ref={mapContainer} className="map-container" /></div>
         
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
               
                    <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                        <Button onClick={addWaypoint}>Nuevo Waypoint</Button>
                        <Button onClick={deleteWaypoint}>Eliminar Waypoint</Button>
                        <Button onClick={saveWaypoint}>Guardar Waypoint</Button>
                        <Button onClick={showWaypoint}>Mostrar Waypoints</Button>
                    </ButtonGroup>
            
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >{loadWaypoints()}    </Grid>
            
                <Modal
                // eslint-disable-next-line react/prop-types
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Text in a modal</h2>
                        <p id="parent-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>
                        <Button onClick={handleClose}>Close Child Modal</Button>

                    </Box>
                </Modal>
                <Alert severity="error" message={message} handleClose={handleCloseSnack} getOpen={getSnack}></Alert>
            </div>
            
        </React.Fragment>
    );
}
export default MapPlanRoute;