import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import LandingPage from './LandingPage';
import GeneralDashboard from './GeneralDashboard';



const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
                <Route exact path='/generalDashboard' component={GeneralDashboard}></Route>
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;