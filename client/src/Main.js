import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import LandingPage from './LandingPage';
import GeneralDashboard from './GeneralDashboard';
import Quiz from './quiz/quizUser.js';



const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
                <Route exact path='/generalDashboard' component={GeneralDashboard}></Route>
                <Route exact path='/userQuiz' component={Quiz}></Route>
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;