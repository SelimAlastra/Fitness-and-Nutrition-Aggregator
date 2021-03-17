import { React } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { signOut } from './actions/userAuth.js';

import './AdminNavigationBar.css';



// This is the navigation bar that will be used for the admin's page

const AdminNavigationBar = () => {
    const history = useHistory();
    return (
    
    <Navbar bg="dark" variant="dark" className="navigation" >
        <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand>Admin</Navbar.Brand>
        <Nav>
            <Nav.Link>Statistics</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/admin/reports"}}>Reports</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/admin/basicUsers"}}>Basic Users</Nav.Link>
            <Nav.Link onClick={() => {window.location.href="/admin/ProfessionalUsers"}}>Professional Users</Nav.Link>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Nav.Link onClick={() => { signOut(() => {history.push('/');});}}>Logout</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        </Navbar.Collapse>
    </Navbar>
    );
};

export default AdminNavigationBar;