import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateUser, deleteUser } from "../../../actions/users";

const UserDetails = () => {
    
    const dispatch = useDispatch();

    const { id } = useParams();

    const user = useSelector((state) => id ? state.users.find(u => u._id === id) : null);

    const handleBan = () => {
        user.isBanned = !user.isBanned;
        dispatch(updateUser(user._id, user));
    }

    const handleDelete = () => {
        dispatch(deleteUser(user._id));
        //window.location.href="/Users";
    }
    
    return(
        <>
            <LinkContainer to='/Users'>
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
            <LinkContainer to={{pathname:"/Users/edit/" + user._id, state: {user: user}}}>
                <Button variant="primary">Edit</Button>
            </LinkContainer>
            &nbsp; &nbsp;
            <Button variant="primary" onClick={ () => { handleBan() }}>Ban</Button>
            &nbsp; &nbsp;
            <LinkContainer to='/Users'>
                <Button variant="primary" onClick={ () => { handleDelete() }}>Delete</Button>
            </LinkContainer>
        </>
    );

}

export default UserDetails;