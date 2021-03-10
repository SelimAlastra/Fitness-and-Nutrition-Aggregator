import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import LandingPage from './LandingPage';
import GeneralDashboard from './GeneralDashboard';
import Register from './components/BasicUsersAuth/userRegister.jsx';
import Login from './components/BasicUsersAuth/userLogin.jsx';
import UserPage from './components/BasicUsersAuth/userPage.jsx';
import ForgetPassword from './components/BasicUsersAuth/forgetPassword.jsx';
import ResetPassword from './components/BasicUsersAuth/resetPassword.jsx';

const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
                <Route exact path='/generalDashboard' component={GeneralDashboard}></Route>
                <Route exact path='/launch' exact render={props => <Fragment> <Login {...props}/> <Register {...props}/> </Fragment>} />
                <Route exact path='/user' exact render={props => <UserPage {...props} />} />
                <Route exact path='/user/password/forget' exact render={props => <ForgetPassword {...props} />} />
                <Route exact path='/user/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;