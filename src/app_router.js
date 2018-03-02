import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import Auth from '../routes/Auth';
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import 'antd/dist/antd.css';
import './App.css'; 

export default () => (
    <Router>
        <Switch>
        {/* <Route exact path='/auth' render={props => <Auth {...props} />} /> */}
        <Route exact path={"/login"} render={props => <Login {...props} />} />
        <Route exact path={"/register"} render={props => <Register {...props} />} />
        <Route exact path={"/home"} render={props => <Home {...props} />} />
        <Redirect from={"/"} to={"/login"} />
        </Switch>
    </Router>
)