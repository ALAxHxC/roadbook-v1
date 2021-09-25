import logo from './logo.svg';
import './App.css';

//DOM
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Location from './componets/location';
import Login from './componets/login';
import Register from './componets/register';
import Dashboard from './componets/dashboard/index';
import Reset from './componets/reset';

let dataOdometer = {
	odometer: 0
};

export const ContextData = React.createContext(dataOdometer);

function App() {
	return (
		<ContextData.Provider value={dataOdometer}>
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/reset" component={Reset} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
		</ContextData.Provider>
	);
}

export default App;
