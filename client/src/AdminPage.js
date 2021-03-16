import { React } from "react";
import reactDom from "react-dom";
import { Link, Switch, Route } from "react-router-dom";
import { Form, Container, Button, Navbar, Nav, FormControl } from "react-bootstrap";
import Reports from './components/Reports/Reports'
import ReportView from './components/Reports/Report/ReportView'
import BasicUsers from "./components/BasicUsers/BasicUsers";
import BasicUserDetails from "./components/BasicUsers/BasicUser/BasicUserDetails";
import BasicUserEdit from "./components/BasicUsers/BasicUser/BasicUserEdit";
import ProfessionalUsers from "./components/ProfessionalUsers/ProfessionalUsers";
import ProfessionalUserEdit from "./components/ProfessionalUsers/ProfessionalUser/ProfessionalUserEdit";
import ProfessionalUserDetails from "./components/ProfessionalUsers/ProfessionalUser/ProfessionalUserDetails";

// This is the navigation bar that will be used for the admin's page
const NavigationBar = () => (
    <Navbar bg="dark" variant="dark">
         <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand>Admin</Navbar.Brand>
        <Nav>
            <Nav.Link>Statistics</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/reports"}}>Reports</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/basicUsers"}}>Basic Users</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/ProfessionalUsers"}}>Professional Users</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Form inline>
            <FormControl type="text" placeholder="" />
            <Button variant="outline-info">Search</Button>
        </Form>
        </Navbar.Collapse>
    </Navbar>
);

const style = {
    margin: "33px auto 36px",
    padding: "35px",
};

const AdminPage = () => (
    <div>
        <NavigationBar />
        <br />
            <Switch>
                <Route exact path='/basicUsers' component={BasicUsers}/>
                <Route exact path='/basicUsers/:id' component={BasicUserDetails}/>
                <Route exact path='/basicUsers/edit/:id' component={BasicUserEdit}/>
                <Route exact path='/professionalUsers' component={ProfessionalUsers}/>
                <Route exact path='/professionalUsers/:id' component={ProfessionalUserDetails}/>
                <Route exact path='/professionalUsers/edit/:id' component={ProfessionalUserEdit}/>
                <Route exact path='/reports' component={Reports}/>
                <Route exact path='/reports/:id' component={ReportView}/>
            </Switch>
    </div>
);

export default AdminPage;