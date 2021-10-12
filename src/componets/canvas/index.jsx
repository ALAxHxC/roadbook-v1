import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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


export default function Paint(props) {
    
    //const handleOpen = () => setOpen(true);
    // eslint-disable-next-line react/prop-types
    const handleClose = () => props.setModal(false);
    return (
        <React.Fragment>
            <Modal
                // eslint-disable-next-line react/prop-types
                open={props.getModal()}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
								
            >
                <Box sx={{ ...style, width: '60%' }}>
								
                    <h2 id="parent-modal-title">Text in a modal</h2>
                  
                    <p id="parent-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>

                </Box>
            </Modal>
        </React.Fragment>
    
    );
}