import logo from './logo.svg';
import './App.css';
import ClientSignup from "./client_signup.js";
import UserLogin from './user_login.js';
import React from 'react';

function App() {
  return (<div>
    < UserLogin />
    < ClientSignup />
    </div>);


// function App() {
//   return < UserLogin />;
// }
}
export default App;
