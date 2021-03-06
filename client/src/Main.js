import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
<<<<<<< HEAD
import LandingPage from './LandingPage';
import GeneralDashboard from './GeneralDashboard';
=======
import LandingPage from './LandingPage'
>>>>>>> origin/development



const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
<<<<<<< HEAD
                <Route exact path='/generalDashboard' component={GeneralDashboard}></Route>
=======
>>>>>>> origin/development
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;