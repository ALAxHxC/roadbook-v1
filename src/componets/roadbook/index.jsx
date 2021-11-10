import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
// import "../Dashboard.css";
import '../style/card.css';
// MATERIAL UI
import Paper from '@material-ui/core/Paper';
// MENU
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Item from './item';
// eslint-disable-next-line no-unused-vars
import ModalImportRoute from './file';
//MENU
import MenuRoadbook from '../menu';
import { auth, db, logout } from '../../firebase/firebase';
// estilos
import useStylesIndex from '../style/index';
import ElevationScroll from '../style/scroll';
// distancias
import calculateDistance from '../../geolocation/distance';
//APP
import {
    ContextData
} from '../../App';
//ModalImportRoute getOpen={open} setOpen={setOpen}></ModalImportRoute>
ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function Roadbook(props) {
    const context = useContext(ContextData);
    const classes = useStylesIndex();
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [odoTotal, setOdoTotal] = useState(0);
    const [user, loading, error] = useAuthState(auth);
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    const [points] = useState([1, 2, 3, 4, 5, 6, 8, 9, 9, 9]);
    const history = useHistory();
    const [currentPosition, setCurrentPosition] = useState({
        lat: 0,
        long: 0,
    });

    const fetchUserName = async () => {
        try {
            const query = await db
                .collection('users')
                .where('uid', '==', user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert('An error occured while fetching user data');
        }
    };
	
    const resetOdo = () => {
        setOdoTotal(0);
        context.odometer = 0;
    };

    const loadPoints = () => (
        <Paper className={classes.paper}>
            {points.map((point, index) => (<Item key={index} />))}
        </Paper>
    );

    const requestGeoLocation = () => {
        navigator.permissions.query({
            name: 'geolocation',
        }).then((result) => {
            if (result.state == 'prompt') {
                alert('NESECITAMOS LA UBICACION PARA CONTINUAR');
                alert(result.state);
            }
            if (result.state == 'denied') {
                alert(result.state);
                navigator.geolocation.getCurrentPosition(() => {

                }, () => {
                    alert('LO SIENTO NESECITAMOS LA UBICACION PARA CONTINUAR');
                    requestGeoLocation();
                }, {
                    enableHighAccuracy: true,
                });
            }
            result.onchange = function () {
                alert('NESECITAMOS LA UBICACION PARA CONTINUAR');
            };
        });
    };

    function successLocation(position) {
        setCurrentPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        });
    }
    const handleOpen = () => setOpen(true);
  
    useEffect(() => {
        if (!('geolocation' in navigator)) {
            requestGeoLocation();
        }
        navigator.geolocation.getCurrentPosition(successLocation, error, {
            enableHighAccuracy: true,
        });
        // requestGeoLocation();
        if (loading) return;
        if (!user) return history.replace('/');

        navigator.geolocation.watchPosition((position) => {
            if (position.coords.latitude === 0 || position.coords.longitude == 0) {
                return;
            }
            if (currentPosition[0] === 0) {
                setCurrentPosition(position.coords.latitude, position.coords.longitude);
            }
        
            context.odometer = context.odometer + calculateDistance(currentPosition.lat,
                currentPosition.lon, position.coords.latitude, position.coords.longitude);
            setOdoTotal((context.odometer / 1000).toFixed(3));

            setCurrentPosition({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });

            setSpeed(position.coords.speed | 0);
        }, (error) => {
            console.log('error',error);
        },
        {
            enableHighAccuracy: true,
        });

        fetchUserName();
    }, [user, loading]);
    return (

        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar position="fixed">
                    <Toolbar>
                        <MenuRoadbook history={history}></MenuRoadbook>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Waypoint 1
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                        <Button color="inherit" onClick={handleOpen}>Import File-</Button>
                    </Toolbar>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {odoTotal} KM
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {speed} KM/H
                        </Typography>
                        <Button color="inherit" onClick={resetOdo}>Reset</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>

                <Box sx={{ my: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Roadbook V1
                    </Typography>
                    {loadPoints()}
                </Box>
          
            </Container>
        </>
    );
}
export default Roadbook;
