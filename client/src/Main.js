import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import LandingPage from './LandingPage';
import ClientDashboard from './ClientDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import Quiz from './quiz/quizUser.js';

import Register from './components/BasicUsersAuth/userRegister.jsx';
import Login from './components/BasicUsersAuth/userLogin.jsx';
import UserPage from './components/BasicUsersAuth/userPage.jsx';
import ForgetPassword from './components/BasicUsersAuth/forgetPassword.jsx';
import ResetPassword from './components/BasicUsersAuth/resetPassword.jsx';

import ProfRegister from './components/ProfessionalUsersAuth/professionalRegister.jsx';
import ProfLogin from './components/ProfessionalUsersAuth/professionalLogin.jsx';
import ProfessionalPage from './components/ProfessionalUsersAuth/professionalPage.jsx';
import ProfForgetPassword from './components/ProfessionalUsersAuth/forgetPassword.jsx';
import ProfResetPassword from './components/ProfessionalUsersAuth/resetPassword.jsx';

import ClientProfile from "./components/ClientProfile/ClientProfile";
import EditProfessionalDetails from "./components/ProfessionalProfile/EditDetails/EditProfessionalDetails";
import EditServices from "./components/ProfessionalProfile/EditServices/EditServices";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';
import EditBasicUser from './components/EditBasicUser/EditBasicUser';
import MyServices from './components/MyServices/MyServices';
import AddService from './components/ProfessionalProfile/EditServices/AddService';


const Main = () => {
    let logged = false;
    if (!logged )
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}></Route>
                <Route exact path='/adminLogin' component={AdminLogin}></Route>
                <Route exact path='/adminPage' component={AdminPage}></Route>
                <Route exact path='/clientDashboard' component={ClientDashboard}></Route>
                <Route exact path='/professionalDashboard' component={ProfessionalDashboard}></Route>

                <Route exact path='/userQuiz' component={Quiz}></Route>
                <Route exact path='/launch/users' exact render={props => <Fragment> <Login {...props}/> <Register {...props}/> </Fragment>} />
                <Route exact path='/user' exact render={props => <UserPage {...props} />} />
                <Route exact path='/user/password/forget' exact render={props => <ForgetPassword {...props} />} />
                <Route exact path='/user/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

                <Route exact path='/launch/professionals' exact render={props => <Fragment> <ProfLogin {...props}/> <ProfRegister {...props}/> </Fragment>} />
                <Route exact path='/professional' exact render={props => <ProfessionalPage {...props} />} />
                <Route exact path='/professional/password/forget' exact render={props => <ProfForgetPassword {...props} />} />
                <Route exact path='/professional/password/reset/:token' exact render={props => <ProfResetPassword {...props} />} />

                {/* this is for testing */}
                {/* <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={false} basicUserID="6044e87ba64dcf1f659df72a"/>}></Route> */}
                {/* <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={false} basicUserID="6044e87ba64dcf1f659df72a"/>}></Route> */}
                <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={true} />}></Route>

                
                <Route exact path="/professional/profile/edit/:id" component={EditProfessionalDetails}></Route>
                <Route exact path="/professional/services/edit/:id" component={EditServices}></Route>
                <Route exact path="/user/profile/:id" component={ClientProfile}></Route>
                <Route exact path="/user/edit/:id" component={EditBasicUser}></Route>
                <Route exact path="/user/myservices/:id" component={MyServices}></Route>
                <Route exact path="/professional/services/add/:id" component={AddService}></Route>
        
            </Switch>
        )
    else return (
        <AdminPage />
    )
}

export default Main;