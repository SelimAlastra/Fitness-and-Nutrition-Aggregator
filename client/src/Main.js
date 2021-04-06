import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import LandingPage from './LandingPage';
import ClientDashboard from './ClientDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import Quiz from './quiz/quizUser.js';
import {questionsClient,questionsReqInputClient,questionsMultipleChoicesClient} from './quiz/resources/clientQuestions';
import {questionsProfessional,questionsReqInputProfessional,questionsMultipleChoicesProfessional} from './quiz/resources/professionalQuestions';
import ContactUs from './components/ContactUsPage/ContactUs'
import HomePage from './components/HomePage/HomePage';
import EditGoals from './components/HomePage/EditGoals';

import ProfessionalPosts from './components/Posts/ProfessionalPosts';

import ForgetPassword from './components/UsersAuth/forgetPassword.jsx';
import ResetPassword from './components/UsersAuth/resetPassword.jsx';
import NavbarUser from './components/Navbar/NavbarUser.js';

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

        <PrivateRoute exact path='/contactUs/:id' component={Wrapper} componentToRender={ContactUs} userType={'client'}/>

        <PrivateRoute exact path='/clientDashboard/:id' component={Wrapper} componentToRender={ClientDashboard} userType={'client'}/>
        <PrivateRoute exact path='/professionalDashboard/:id' component={Wrapper} componentToRender={ProfessionalDashboard} userType={'professional'}/>

        <Route exact path='/myPosts/:id' component={ProfessionalPosts}></Route>
  
        <Route exact path='/user/myBuckets/:id' component={BucketPage}></Route>
        <Route exact path='/user/myBuckets/:id/:title' component={BucketContent}></Route>

        <Route exact path='/user/password/forget' exact render={props => <ForgetPassword {...props} />} />
        <Route exact path='/user/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
        <Route exact path='/professional/password/forget' exact render={props => <ForgetPassword {...props} />} />
        <Route exact path='/professional/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

        <Route exact path='/user/quiz/:id' exact render={props => <Quiz {...props} questions={questionsClient} questionsReqInput={questionsReqInputClient} questionsMultipleChoices={questionsMultipleChoicesClient} isClient={true}/>}/>
        <Route exact path='/professional/quiz/:id' exact render={props => <Quiz {...props} questions={questionsProfessional} questionsReqInput={questionsReqInputProfessional} questionsMultipleChoices={questionsMultipleChoicesProfessional} isClient={false}/>}/>
        
        <PrivateRoute exact path="/professional/profile/:id" component={Wrapper} componentToRender={ProfessionalProfile} userType={'professional'}/>
        <PrivateRoute exact path="/user/professional/profile/:professionalID/:id" component={Wrapper} componentToRender={ProfessionalProfile} userType={'client'}/>
                
        <PrivateRoute exact path="/professional/edit/:id" component={Wrapper} componentToRender={EditProfessionalDetails} userType={'professional'}/>

        <Route exact path="/user/profile/:id" component={ClientProfile}/>
        <PrivateRoute exact path="/user/edit/:id" component={Wrapper} componentToRender={EditBasicUser} userType={'client'}/>
        <PrivateRoute exact path="/user/myservices/:id" component={Wrapper} componentToRender={MyServices} userType={'client'}/>

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