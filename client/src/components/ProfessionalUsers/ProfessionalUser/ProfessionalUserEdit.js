import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { updateProfessional, getProfessional } from '../../../actions/professionals';

const ProfessionalUserEdit = () => {

    const [userData, setUserData] = useState( {username: ''} );
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getProfessional(id));
     }, [dispatch]);

    const user = useSelector((state) => state.basicUsers);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateProfessional(id, userData));
        window.location.href=`/admin/ProfessionalUsers/${user._id}`;
    }

    useEffect(() => {
        if(user) setUserData(user)
    }, [user])
    
    return( 
    <>
<Button variant="primary" onClick={() => {window.location.href=`/admin/ProfessionalUsers/${user._id}`}}>Back</Button>
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

export default ProfessionalUserEdit;