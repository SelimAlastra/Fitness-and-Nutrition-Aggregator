import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./adminLogin";
import AdminPage from "./adminPage";


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={AdminPage}></Route>
        </Switch>
    )
}

export default Main;