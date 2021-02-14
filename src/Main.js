import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./adminLogin";


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={AdminLogin}></Route>
        </Switch>
    )
}

export default Main;