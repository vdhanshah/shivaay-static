import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './animate.css'
import './global.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

import {applyMiddleware, combineReducers, createStore} from 'redux';
import doctors from './redux/reducers/doctors'
import thunk from 'redux-thunk';
import {Provider} from "react-redux";

const rootReducers = combineReducers({
    doctors : doctors
})
const store = createStore(rootReducers, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={ store }>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
