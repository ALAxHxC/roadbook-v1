import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
// import "../Dashboard.css";
import '../style/card.css';
// MATERIAL UI
// MENU
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { auth, logout } from '../../firebase/firebase';
// estilos

import ElevationScroll from '../style/scroll';
// distancias

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function Roadbook(props) {
    const [user, loading] = useAuthState(auth);
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        
        // requestGeoLocation();
        if (loading) return;
        if (!user) return history.replace('/');
      
    }, []);
    return (

        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar position="fixed">
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Waypoint 1
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
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
            </Container>
        </>
    );
}
export default Roadbook;
