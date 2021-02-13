import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import client_signup from "./client_signup";
import client_signup2 from "./client_signup2";

ReactDOM.render(
    <BrowserRouter>
    <Switch>
     <Route exact path="/" component={client_signup} />
     <Route path="/register_form" component={client_signup2} />
   </Switch>
   </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
