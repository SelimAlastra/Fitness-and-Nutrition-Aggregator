import { React } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Form, Container, Button, Navbar, Nav, FormControl } from "react-bootstrap";

// This is the navigation bar that will be used for the admin's page
const NavigationBar = () => (
    <Navbar bg="dark" variant="dark">
         <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand>Admin</Navbar.Brand>
        <Nav>
            <Nav.Link>Statistics</Nav.Link>
            <Nav.Link>Reports</Nav.Link>
            <Nav.Link>Issues</Nav.Link>
            <Nav.Link>Users</Nav.Link>
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
    <NavigationBar />
);

export default AdminPage;