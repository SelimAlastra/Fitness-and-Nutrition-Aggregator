import React from "react";
import { Button,Container } from "react-bootstrap";
import { updateUser, deleteUser } from "../../actions/users";
import { useDispatch } from 'react-redux';

const User = ({ user }) => {

    const dispatch = useDispatch();

    const handleBan = () => {
        user.isBanned = !user.isBanned;
        dispatch(updateUser(user._id, user));
    }

    return (
        <>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{"" + user.isBanned}</td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteUser(user._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => { handleBan() }}>Ban</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Details</Button>
                </Container>
            </td>
        </>
    )
}

export default User;