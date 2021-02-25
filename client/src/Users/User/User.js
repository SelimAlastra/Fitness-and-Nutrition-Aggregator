import React from "react";
import { Button } from "react-bootstrap";

const User = ({ user }) => (
    <>
        <td>{user._id}</td>
        <td>{user.username}</td>
        <td>{user.isBanned}</td>
        <td><Button variant="primary" onClick={ () => {}}>Delete</Button></td>
    </>
);

export default User;