import React from "react";
import { Button,Container } from "react-bootstrap";

const User = ({ user }) => (
    <>
        <td>{user._id}</td>
        <td>{user.username}</td>
        <td>{user.isBanned}</td>
        <td>
            <Container fluid>
            <Button variant="primary" onClick={ () => {}}>Delete</Button>
            <Button variant="primary" onClick={ () => {}}>Ban</Button>
            <Button variant="primary" onClick={ () => {}}>Details</Button>
            </Container>
        </td>
    </>
);

export default User;