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
//import menuPage from "../dashboard/menu";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		maxWidth: "60%",
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

function Dashboard() {
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
		<div className="dashboard">
			<div className="dashboard__container">
				<div>{name}</div>
				<div>{user?.email}</div>
				<div className={classes.root}>
					{loadPoints()}
				</div>
			</div></div>
	);
}
export default Dashboard;