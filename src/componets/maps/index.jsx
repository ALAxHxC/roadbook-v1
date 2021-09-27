/* eslint-disable no-unused-vars */
import mapboxgl from '!mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ydGl6dmVnYSIsImEiOiJja3UwamVqcnUwdmFsMnZvdzUzNm9wMThxIn0.aFhueiPPoBznn4aWpkMAmA';

import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function MapPlanRoute() {
	
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const addWaypoint = () => {
			
    };
    const deleteWaypoint = () => {
			
    };
    const showWaypoint = () => {
			
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
            showUserHeading: true
						
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
        <div>
            <div className="sidebar">	
							Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={addWaypoint}>Nuevo Waypoint</Button>
                <Button onClick={deleteWaypoint}>Eliminar Waypoint</Button>
                <Button onClick={showWaypoint}>Mostrar Waypoint</Button>
            </ButtonGroup>
        </div>
    );
}
export default MapPlanRoute;