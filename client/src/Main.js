import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";



const Main = () => {
    let logged = true;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;