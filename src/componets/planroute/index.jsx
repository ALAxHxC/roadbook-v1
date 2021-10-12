import React, { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
// import "../Dashboard.css";
import '../style/card.css';
// MATERIAL UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { auth, logout } from '../../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Waypoint from './waypoint';
// estilos
import MenuRoadbook from '../menu';

import ElevationScroll from '../style/scroll';
// distancias
import MapPlanRoute from '../maps/index';
//Paint
// eslint-disable-next-line no-unused-vars
import Paint from '../canvas/index';




ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function Roadbook(props) {
    const [user, loading] = useAuthState(auth);
    const waypoints = useRef([]);
    const modal = useRef(false);

    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        
        // requestGeoLocation();
        if (loading) return;
        if (!user) return history.replace('/');
      
    }, []);
    const openDraw = () => {
        modal.current = true;
    };
	
    const loadWaypoints = () => (
        <Paper>
            {waypoints.current.map((point, index) => (<Waypoint key={index} />))}
        </Paper>
    );
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
                        <Button color="inherit" onClick={openDraw}>Draw</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
                <Box sx={{ my: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Roadbook V1
                    </Typography>
                </Box>
                <MapPlanRoute waypoints={waypoints}></MapPlanRoute>
                {loadWaypoints()}
            </Container>
            
        </>
    );
}
export default Roadbook;
