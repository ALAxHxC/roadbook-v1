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
import Alert from '../../common/alert';
import Painterro from 'painterro';
import getRoute from './route';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    const addWaypoint = () => {
        console.log(map.current.getCenter());
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([map.current.getCenter().lng, map.current.getCenter().lat])
        // eslint-disable-next-line react/prop-types
            .setPopup(new mapboxgl.Popup().setHTML(`<h1>Waypoint ${props.waypoints.current.length + 1}</h1>`))
            .addTo(map.current);
        console.log(marker.getPopup());
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
    const handleOpen = () => {
        Painterro({
            language: 'es'  // Spanish
        }).show(); 
        // setOpenModal(true);
    };
    const handleClose = () => {
        console.log('here');
        setOpenModal(false);
    };
    const addMarker = () => {
        props.waypoints.current.push(currentMarker);
    };
    const deleteWaypoint = () => {
        if (currentMarker != null) {
            return currentMarker.remove();	
        }
    };
    const showWaypoint = () => {
      
    };
	
    const saveWaypoint = () => {
        console.log(props.waypoints.current.length);
        if (!currentMarker) { 
            handleClickSnack();
            return;
        }
        if (props.waypoints.current.length < 1) {
            return addMarker();  
            //return showPainter();
        }
			
      
        return newRoute();
        // eslint-disable-next-line react/prop-types
       
        //setOpenModal(true);
        // eslint-disable-next-line react/prop-types
       
			
    };
    async function newRoute() { 
        console.log(currentMarker._lngLat, props.waypoints.current[props.waypoints.current.length - 1]._lngLat);
        await getRoute(currentMarker._lngLat, props.waypoints.current[props.waypoints.current.length - 1]._lngLat, map.current,props.waypoints.current.length);
        addMarker();
    }
    const showPainter = () => {
        Painterro({
            language: 'es' , // Spanish
            saveHandler:saveImage
        }).show(); 
    };
    const saveImage = (image, done) => { 
        addMarker();
        console.log(image);
        return done(true);
    };
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
            <div className="sidebar">	
							Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={addWaypoint}>Nuevo Waypoint</Button>
                <Button onClick={deleteWaypoint}>Eliminar Waypoint</Button>
                <Button onClick={saveWaypoint}>Guardar Waypoint</Button>
                <Button onClick={showWaypoint}>Mostrar Waypoints</Button>
            </ButtonGroup>
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
        </React.Fragment>
    );
}
export default MapPlanRoute;