import logo from './logo.svg';
import './App.css';

//DOM
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Location from './componets/location';
import Login from './componets/login';
import Register from './componets/register';
import Dashboard from './componets/dashboard/index';
import Reset from './componets/reset';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
