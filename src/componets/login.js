import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../login.css";

//UI
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
	//const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const history = useHistory();/*
	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) history.replace("/dashboard");
	}, [user, loading]);*/
	return (
		<div className="login">
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				<Grid item>
					<input
						type="text"
						className="login__textBox"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
					/>
				</Grid>
				<Grid item>
					<input
						type="password"
						className="login__textBox"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained" color="primary"
						onClick={() => signInWithEmailAndPassword(email, password)}
					>
						Login
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained" color="secondary"
						onClick={signInWithGoogle}>
						Login with Google
					</Button>
				</Grid>
				<div>
					<Link to="/reset">Forgot Password</Link>
				</div>
				<div>
					Don't have an account? <Link to="/register">Register</Link> now.
				</div>
			</Grid>

		</div>
	);
}
export default Login;