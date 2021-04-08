import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from "react-router-dom";
import { deleteProfessionalUser, getProfessional, updateProfessional } from '../../../actions/professionals';

const ProfessionalUserDetails = () => {
    
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getProfessional(id));
     }, [dispatch]);

    const user = useSelector((state) => state.professional);

    const handleBan = () => {
        user.isBanned = !user.isBanned;
        dispatch(updateProfessional(user._id, user));
        window.location.reload();
    }

    const handleDelete = () => {
        dispatch(deleteProfessionalUser(user._id));
        window.location.href="/admin/ProfessionalUsers";
    }
    
    return(
        <>
            <Button style={{"marginTop":"75px"}} variant="primary" onClick={() => {window.location.href="/admin/ProfessionalUsers"}}>Back</Button>
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
                <ListGroupItem>Created at: {user.createdAt}</ListGroupItem>
            </ListGroup>
            <br />
            <Button variant="primary" onClick={() => {window.location.href=`/admin/ProfessionalUsers/edit/${user._id}`}}>Edit</Button>
            &nbsp; &nbsp;
            { user.isBanned === false ?
                <Button variant="primary" onClick={ () => { handleBan() }}>Ban</Button>
            :
                <Button variant="primary" onClick={ () => { handleBan() }}>Unban</Button>
            }
            &nbsp; &nbsp;
            <Button variant="primary" onClick={ () => { handleDelete() }}>Delete</Button>
        </>
    );

}

export default ProfessionalUserDetails;