import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteIssue } from "../../../actions/issues";
import { useDispatch } from 'react-redux';

const Issue = ({ issue }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{issue.username}</td>
            <td>{issue.description}</td>
            <td></td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteIssue(issue._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Reply</Button>
                </Container>
            </td>
        </>
    )
}

export default Issue;