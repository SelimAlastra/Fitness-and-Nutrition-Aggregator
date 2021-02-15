import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClientProfile from './ClientProfile';
ReactDOM.render(
  <React.StrictMode>
    <ClientProfile 
    name="Joshua Harris" 
    location="London, UK" 
    description="I am looking for a personal trainer to help acheive my goals"
    tags={["#yoga", "#pilates", "#Healthyeating"]}
    profileImage="https://images.unsplash.com/photo-1582556362337-6a785ee99c63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
