import React, { useState, useEffect } from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {  updateUser } from "../../../actions/users";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserEdit = () => {

    const [userData, setUserData] = useState( {username: ''} );
    const dispatch = useDispatch();

    const { id } = useParams();

    const user = useSelector((state) => id ? state.users.find(u => u._id === id) : null);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUser(id, userData));
        window.location.href="/Users";
    }

    useEffect(() => {
        if(user) setUserData(user)
    }, [user])
    
    return( 
    <>
        <Link className='btn gray' to={'/Users/' + user._id }>Back</Link>
        <br />
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

            <Button variant="primary" type="submit">Update</Button>
        </Form>
    </>
    );
}

export default UserEdit;