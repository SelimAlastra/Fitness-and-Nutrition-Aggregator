import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getBasicUser, updateBasicUser } from '../../../actions/basicUsers';

const BasicUserEdit = () => {

    const [userData, setUserData] = useState( {username: ''} );
    const dispatch = useDispatch();

    const { id } = useParams();

    const user = useSelector((state) => id ? state.basicUsers.find(u => u._id === id) : null);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateBasicUser(id, userData));
        window.location.href="/BasicUsers";
    }

    useEffect(() => {
        if(user) setUserData(user)
    }, [user])
    
    return( 
    <>
        <LinkContainer to={`/BasicUsers/${user._id}`}>
            <Button variant="primary">Back</Button>
        </LinkContainer>
        <br />
        <br />
        <Form onSubmit={handleSubmit} >
            <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
                id="username"
                name="username"
                type="text"
                value={userData.username}
                onChange={(e) => setUserData( { ...userData, username: e.target.value } )}
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
                id="email"
                name="email"
                type="text"
                value={userData.email}
                onChange={(e) => setUserData( { ...userData, email: e.target.value } )}
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData( { ...userData, name: e.target.value } )}
            />
            </Form.Group>

            <Button variant="primary" type="submit">Update</Button>
        </Form>
    </>
    );
}

export default BasicUserEdit;