import React, {useState} from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  createUser } from "../actions/users";

const UserForm = () => {

    const [userData, setUserData] = useState( {username: ''} );
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createUser(userData));
    }
    
    return(
    <Form onSubmit={handleSubmit} >
        <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
            id="username"
            name="username"
            type="text"
            value={userData.username}
            placeholder="Enter Username"
            onChange={(e) => setUserData( { ...userData, username: e.target.value } )}
        />
        </Form.Group>

        <Button variant="primary" type="submit">Create</Button>
    </Form>
    );
}

export default UserForm;