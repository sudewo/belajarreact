import React from 'react';
import ReactDom from 'react-dom';
import {Router, hashHistory, browserHistory,} from 'react-router';
import routes from './router.jsx';

ReactDom.render(
    <Router history={browserHistory} routes={routes}/>, document.getElementById('app'));
