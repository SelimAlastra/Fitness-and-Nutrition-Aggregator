import { React } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import LandingPage from './LandingPage';
import GeneralDashboard from './GeneralDashboard';
import ClientProfile from "./components/ClientProfile/ClientProfile";
import EditProfessionalDetails from "./components/ProfessionalProfile/EditDetails/EditProfessionalDetails";
import EditServices from "./components/ProfessionalProfile/EditServices/EditServices";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';


const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
                <Route exact path='/generalDashboard' component={GeneralDashboard}></Route>

                <Route exact path="/professional/profile/:id" component={ProfessionalProfile}></Route>
                <Route exact path="/professional/profile/edit/:id" component={EditProfessionalDetails}></Route>
                <Route exact path="/professional/services/edit/:id" component={EditServices}></Route>
                <Route exact path="/user/profile/:id" component={ClientProfile}></Route>
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;