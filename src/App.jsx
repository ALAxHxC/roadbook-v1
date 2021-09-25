import './App.css';

// DOM
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import Login from './componets/login';
import Register from './componets/register';
import Roadbook from './componets/roadbook/index';
import PlanRoute from './componets/planroute/index';
import Reset from './componets/reset';

const dataOdometer = {
    odometer: 0,
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
                    <Route exact path="/roadbook" component={Roadbook} />
                    <Route exact path="/planroute" component={PlanRoute} />
                </Switch>
            </Router>
        </ContextData.Provider>
    );
}

export default App;
