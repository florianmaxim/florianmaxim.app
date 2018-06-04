import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute
} from 'react-router-dom'

var hashHistory = Router.hashHistory;

ReactDOM.render(
  <Router history={hashHistory}>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/:id" component={App}/>
    </div>
  </Router>, document.getElementById('root'));

registerServiceWorker();
