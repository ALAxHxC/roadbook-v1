
import React from 'react';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
function MenuRoadbook(props) { 
    const goToplaneRoute = () => {
        // eslint-disable-next-line react/prop-types
        props.history.replace('planroute');
    };
    const goToDashboad = () => {
        // eslint-disable-next-line react/prop-types
        props.history.replace('roadbook');
    };
    return <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
            <React.Fragment>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    variant="contained" {...bindTrigger(popupState)}
                >
                    <MenuIcon />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={goToplaneRoute}>Plan Route</MenuItem>
                    <MenuItem onClick={goToDashboad}>Roadbook</MenuItem>
                </Menu>
            </React.Fragment>
        )}
    </PopupState>;
}
export default MenuRoadbook;