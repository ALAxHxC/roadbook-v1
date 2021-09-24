import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
//import "../Dashboard.css";
import "../style/card.css";
import { auth, db, logout } from "../../firebase/firebase";
import Item from "./item";
//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
//MENU
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		maxWidth: "70%",
		overflowY: "scroll"
	},
	image: {
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "80%",
		maxHeight: "80%"
	}
}));


function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

function Dashboard(props) {
	const classes = useStyles();
	//Data de geolocalizacion
	const [position, setPosition] = useState([0, 0]);
	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const [points, setPoints] = useState([1, 2, 3, 4, 5, 6, 8, 9, 9, 9]);
	const history = useHistory();

	const fetchUserName = async () => {
		try {
			const query = await db
				.collection("users")
				.where("uid", "==", user?.uid)
				.get();
			const data = await query.docs[0].data();
			setName(data.name);
		} catch (err) {
			console.error(err);
			alert("An error occured while fetching user data");
		}
	};
	const loadPoints = () =>
	(<Paper className={classes.paper}> {points.map(point => {
		console.log(point)

		return (
			<Item></Item>)
	})}</Paper>);


	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("Available");
		} else {
			console.log("Not Available");
		}
		if (loading) return;
		if (!user) return history.replace("/");
		navigator.geolocation.watchPosition(position => {
			console.log(position);
			setPosition(position.coords.latitude, position.coords.longitude)
		})

		fetchUserName();
	}, [user, loading]);
	return (

		<React.Fragment>
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
							Roadbook V1
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
					{loadPoints()}
				</Box>
			</Container>
		</React.Fragment>
	);
}
export default Dashboard;