import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from "react-router-dom";
import { deleteProfessionalUser, getProfessionalUser, updateProfessional } from '../../../actions/professionals';

const ProfessionalUserDetails = () => {
    
    const dispatch = useDispatch();

    const { id } = useParams();

    const user = useSelector((state) => id ? state.professional.find(u => u._id === id) : null);

    const handleBan = () => {
        user.isBanned = !user.isBanned;
        console.log(user);
        dispatch(updateProfessional(user._id, user));
        window.location.href="/ProfessionalUsers";
    }

    const handleDelete = () => {
        dispatch(deleteProfessionalUser(user._id));
    }
    
    return(
        <>
            <LinkContainer to='/ProfessionalUsers'>
                <Button variant="primary">Back</Button>
            </LinkContainer>
            <br />
            <br />
            <ListGroup>
                <ListGroupItem>ID: {user._id}</ListGroupItem>
                <ListGroupItem>Username: {user.username}</ListGroupItem>
                <ListGroupItem>Email: {user.email}</ListGroupItem>
                <ListGroupItem>Name: {user.name}</ListGroupItem>
                <ListGroupItem>isBanned: {""+user.isBanned}</ListGroupItem>
                <ListGroupItem>Gender: {user.gender}</ListGroupItem>
                <ListGroupItem>DOB: {user.dob}</ListGroupItem>
            </ListGroup>
            <br />
            <LinkContainer to={{pathname:"/ProfessionalUsers/edit/" + user._id, state: {user: user}}}>
                <Button variant="primary">Edit</Button>
            </LinkContainer>
            &nbsp; &nbsp;
            <Button variant="primary" onClick={ () => { handleBan() }}>Ban</Button>
            &nbsp; &nbsp;
            <LinkContainer to='/ProfessionalUsers'>
                <Button variant="primary" onClick={ () => { handleDelete() }}>Delete</Button>
            </LinkContainer>
        </>
    );

}

export default ProfessionalUserDetails;