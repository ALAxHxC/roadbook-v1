import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// UI
import { Button, Grid } from '@material-ui/core';

import { useAuthState } from 'react-firebase-hooks/auth';
import {
    auth,
    signInWithEmailAndPassword,
    signInWithGoogle,
} from '../firebase/firebase';
import '../login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) history.replace('/roadbook');
    }, [user, loading]);

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
                        variant="contained"
                        color="primary"
                        onClick={() => signInWithEmailAndPassword(email, password)}
                    >
            Login
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={signInWithGoogle}
                    >
            Login with Google
                    </Button>
                </Grid>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>					 Dont have an account?
                    <Link to="/register">Register</Link>
                    
          now.
                </div>
            </Grid>
        </div>
    );
};
export default Login;
