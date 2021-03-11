import React, {useState} from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { createBasicUser } from '../../actions/basicUsers';

const BasicUserForm = () => {

    const [userData, setUserData] = useState( {username: '', name: 'kha lklj', email: 'kj@kj', password: '123asd'} );
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createBasicUser(userData));
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

export default BasicUserForm;