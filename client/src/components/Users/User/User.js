import React from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from 'react-redux';
import { render } from "react-dom";

const User = ({ user }) => {


    return (
        <>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <Container>
                    <LinkContainer to={{pathname:"/Users/" + user._id}}>
                        <Button variant="primary">Details</Button>
                    </LinkContainer>
                </Container>
            </td>
        </>
    )
}

export default User;