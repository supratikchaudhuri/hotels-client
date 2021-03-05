import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/main.css";
import App from './App';

import {Provider} from "react-redux";
import store from "./store.js"

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
