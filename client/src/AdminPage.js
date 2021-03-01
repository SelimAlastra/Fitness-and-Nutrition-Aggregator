import { React } from "react";
import reactDom from "react-dom";
import { Link, Switch, Route } from "react-router-dom";
import { Form, Container, Button, Navbar, Nav, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// This is the navigation bar that will be used for the admin's page
const NavigationBar = () => (
    <Navbar bg="dark" variant="dark">
         <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand>Admin</Navbar.Brand>
        <Nav>
            <Nav.Link>Statistics</Nav.Link>
            <Nav.Link>Reports</Nav.Link>
            <LinkContainer to="/Issues">
            <Nav.Link>Issues</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Users">
                <Nav.Link>Users</Nav.Link>
            </LinkContainer>
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
        <Container className="border border-secondary">
        </Container>
    </div>
);

export default AdminPage;