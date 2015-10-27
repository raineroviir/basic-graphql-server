import 'babel/polyfill';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import createHashHistory from 'history/lib/createHashHistory';
import { IndexRoute, Route, Router } from 'react-router';
import ReactRouterRelay from 'react-router-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
