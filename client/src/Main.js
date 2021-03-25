import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import LandingPage from './LandingPage';
import ClientDashboard from './ClientDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import Quiz from './quiz/quizUser.js';
import Tags from './quiz/tagsProffesional.js';

import UserPage from './ClientLoginRegister';
import ForgetPassword from './components/BasicUsersAuth/forgetPassword.jsx';
import ResetPassword from './components/BasicUsersAuth/resetPassword.jsx';

import ProfPage from './ProfessionalLoginRegister'
import ProfForgetPassword from './components/ProfessionalUsersAuth/forgetPassword.jsx';
import ProfResetPassword from './components/ProfessionalUsersAuth/resetPassword.jsx';

import BucketPage from "./components/Buckets2/BucketsPage";
import ClientProfile from "./components/ClientProfile/ClientProfile";
import EditProfessionalDetails from "./components/ProfessionalProfile/EditDetails/EditProfessionalDetails";
import EditServices from "./components/ProfessionalProfile/EditServices/EditServices";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';
import EditBasicUser from './components/EditBasicUser/EditBasicUser';
import MyServices from './components/MyServices/MyServices';
import AddService from './components/ProfessionalProfile/EditServices/AddService';

import Reports from './components/Reports/Reports'
import ReportView from './components/Reports/Report/ReportView'

import BasicUsers from "./components/BasicUsers/BasicUsers";
import BasicUserDetails from "./components/BasicUsers/BasicUser/BasicUserDetails";
import BasicUserEdit from "./components/BasicUsers/BasicUser/BasicUserEdit";

import ProfessionalUsers from "./components/ProfessionalUsers/ProfessionalUsers";
import ProfessionalUserEdit from "./components/ProfessionalUsers/ProfessionalUser/ProfessionalUserEdit";
import ProfessionalUserDetails from "./components/ProfessionalUsers/ProfessionalUser/ProfessionalUserDetails";
import AdminNavigationBar from "./AdminNavigationBar";
import PrivateRoute from "./PrivateRoute";

const Main = () => (
    <>
    <Switch>
        <Route exact path="/admin"> <span/> </Route>
        <Route path="/admin"> <AdminNavigationBar/> </Route>
    </Switch>
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/admin' component={AdminLogin}/>
        <Route exact path='/clientDashboard/:id' component={ClientDashboard}/>
        <Route exact path='/professionalDashboard/:id' component={ProfessionalDashboard}/>
        <Route exact path='/buckets' component={BucketPage}></Route>
        <Route exact path='/launch/users' exact render={props => <UserPage {...props} />} /> 

        <Route exact path='/launch/professionals' exact render={props => <ProfPage {...props} />} />
        <Route exact path='/userQuiz/:id' component={Quiz}/>
        <Route exact path='/professionalTags/:id' component={Tags}/>
                {/* this is for testing */}
                {/* <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={false} basicUserID="6044e87ba64dcf1f659df72a"/>}></Route> */}
                {/* <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={false} basicUserID="6044e87ba64dcf1f659df72a"/>}></Route> */}
        <Route exact path="/professional/profile/:id" render={props => <ProfessionalProfile {...props} isProfessional={true} />}></Route>

                
        <Route exact path="/professional/edit/:id" component={EditProfessionalDetails}></Route>
        <Route exact path='/user/password/forget' exact render={props => <ForgetPassword {...props} />} />
        <Route exact path='/user/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

        <Route exact path='/professional/password/forget' exact render={props => <ProfForgetPassword {...props} />} />
        <Route exact path='/professional/password/reset/:token' exact render={props => <ProfResetPassword {...props} />} />

        <Route exact path="/user/profile/:id" component={ClientProfile}/>
        <Route exact path="/user/edit/:id" component={EditBasicUser}/>
        <Route exact path="/user/myservices/:id" component={MyServices}/>

        {/*<Route exact path="/professional/profile/:id" component={ProfessionalProfile}/>*/}
        {/*<Route exact path="/professional/profile/edit/:id" component={EditProfessionalDetails}/>*/}
        <Route exact path="/professional/services/edit/:id" component={EditServices}/>
        <Route exact path="/professional/services/add/:id" component={AddService}/>

        <PrivateRoute exact path='/admin/basicUsers' component={BasicUsers} userType={'admin'}/>
        <PrivateRoute exact path='/admin/basicUsers/:id' component={BasicUserDetails} userType={'admin'}/>
        <PrivateRoute exact path='/admin/basicUsers/edit/:id' component={BasicUserEdit} userType={'admin'}/>
        <PrivateRoute exact path='/admin/professionalUsers' component={ProfessionalUsers} userType={'admin'}/>
        <PrivateRoute exact path='/admin/professionalUsers/:id' component={ProfessionalUserDetails} userType={'admin'}/>
        <PrivateRoute exact path='/admin/professionalUsers/edit/:id' component={ProfessionalUserEdit} userType={'admin'}/>
        <PrivateRoute exact path='/admin/reports' component={Reports} userType={'admin'}/>
        <PrivateRoute exact path='/admin/reports/:id' component={ReportView} userType={'admin'}/>
    </Switch>
    </>
)

export default Main;