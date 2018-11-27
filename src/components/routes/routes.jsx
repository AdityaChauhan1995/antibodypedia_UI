import React from "react";
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history } from '../../redux/store/index';
import Antibodypedia from './antibodypedia';

const routes = (
    <Router history={history}>
        <React.Fragment>
            <Route path="/home" component={ Antibodypedia }/>
        </React.Fragment>
    </Router>
)

export default routes;
