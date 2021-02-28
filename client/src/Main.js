import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import Issues from "./components/Issues/Issues";
import Users from "./components/Users/Users";


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={AdminLogin}></Route>
            <Route exact path='/adminPage' component={AdminPage}></Route>
            <Route exact path='/Users' component={Users}></Route>
            <Route exact path='/Issues' component={Issues}></Route>
        </Switch>
    )
}

export default Main;