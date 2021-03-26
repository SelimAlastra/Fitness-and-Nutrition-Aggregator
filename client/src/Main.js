import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import LandingPage from './LandingPage';
import ClientDashboard from './ClientDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import Quiz from './quiz/quizUser.js';
// import Tags from './quiz/tagsProffesional.js';
import Tags from './quiz/tagsProffesional.js';
import HomePage from './components/HomePage/HomePage';
import EditGoals from './components/HomePage/EditGoals';


import UserPage from './ClientLoginRegister';
import ForgetPassword from './components/BasicUsersAuth/forgetPassword.jsx';
import ResetPassword from './components/BasicUsersAuth/resetPassword.jsx';
import NavbarUser from './components/Navbar/NavbarUser.js';

import ProfPage from './ProfessionalLoginRegister'
import ProfForgetPassword from './components/ProfessionalUsersAuth/forgetPassword.jsx';
import ProfResetPassword from './components/ProfessionalUsersAuth/resetPassword.jsx';

import BucketPage from "./components/Buckets2/BucketsPage";
import BucketContent from "./components/Buckets2/BucketContent";
import ClientProfile from "./components/ClientProfile/ClientProfile";
import EditProfessionalDetails from "./components/ProfessionalProfile/EditDetails/EditProfessionalDetails";
import EditServices from "./components/Services/EditServices/EditServices";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';
import EditBasicUser from './components/EditBasicUser/EditBasicUser';
import MyServices from './components/Services/MyServices/MyServices';
import AddService from './components/Services/EditServices/AddService';

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
import Wrapper from "./Wrapper";

const Main = () => (
    <>
    <Switch>
        <Route exact path="/admin"> <span/> </Route>
        <Route path="/admin"> <AdminNavigationBar/> </Route>
    </Switch>
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/admin' component={AdminLogin}/>
  
        <PrivateRoute exact path='/homePage/:id' component={Wrapper} componentToRender={HomePage} userType={'client'}/>
        <PrivateRoute exact path='/homePage/edit/:id' component={Wrapper} componentToRender={EditGoals} userType={'client'}/>
        <PrivateRoute exact path='/clientDashboard/:id' component={Wrapper} componentToRender={ClientDashboard} userType={'client'}/>
        <PrivateRoute exact path='/professionalDashboard/:id' component={ProfessionalDashboard} userType={'professional'}/>
  
        <Route exact path='/user/myBuckets/:id' component={BucketPage}></Route>
        <Route exact path='/user/myBuckets/:id/:title' component={BucketContent}></Route>
  
        <Route exact path='/launch/users' exact render={props => <UserPage {...props} />} /> 

        <Route exact path='/launch/professionals' exact render={props => <ProfPage {...props} />} />
        <Route exact path='/userQuiz/:id' component={Quiz}/>
        {/* <Route exact path='/professionalTags/:id' component={Tags}/> */}
        <Route exact path="/professional/profile/:professionalID" render={props => <ProfessionalProfile {...props} isProfessional={true} />}></Route>
        <Route exact path="/user/professional/profile/:professionalID/:clientID" render={props => <ProfessionalProfile {...props} isProfessional={false} />}></Route>

                
        <PrivateRoute exact path="/professional/edit/:id" component={Wrapper} componentToRender={EditProfessionalDetails} userType={'professional'}/>
        <Route exact path='/user/password/forget' exact render={props => <ForgetPassword {...props} />} />
        <Route exact path='/user/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

        <Route exact path='/professional/password/forget' exact render={props => <ProfForgetPassword {...props} />} />
        <Route exact path='/professional/password/reset/:token' exact render={props => <ProfResetPassword {...props} />} />

        <Route exact path="/user/profile/:id" component={ClientProfile}/>
        <PrivateRoute exact path="/user/edit/:id" component={Wrapper} componentToRender={EditBasicUser} userType={'client'}/>
        <PrivateRoute exact path="/user/myservices/:id" component={Wrapper} componentToRender={MyServices} userType={'client'}/>

        {/*<Route exact path="/professional/profile/:id" component={ProfessionalProfile}/>*/}
        {/*<Route exact path="/professional/profile/edit/:id" component={EditProfessionalDetails}/>*/}
        <PrivateRoute exact path="/professional/services/edit/:id" component={Wrapper} componentToRender={EditServices} userType={'professional'}/>
        <PrivateRoute exact path="/professional/services/add/:id" component={Wrapper} componentToRender={AddService} userType={'professional'}/>

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