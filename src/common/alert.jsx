import React,{useState,useEffect} from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function Alert(props) {
    let Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(props.getOpen());
    const [message, setMessage] = useState(props.message);
    // eslint-disable-next-line no-unused-vars
    const [severity, setSeverity] = useState(props.severity);
    useEffect(() => {
        setOpen(props.getOpen());
        setMessage(props.message);
        setMessage(props.message);
        setSeverity(props.severity);
        Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });
    });
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="error" sx={{ width: '100%' }}>
                { message}
            </Alert>
        </Snackbar>);

        
}