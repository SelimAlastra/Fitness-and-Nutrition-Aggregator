import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteIssue } from "../../../actions/issues";
import { useDispatch } from 'react-redux';

const Issue = ({ issue }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{issue._id}</td>
            <td>{issue.Description}</td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteIssue(issue._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Reply</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Details</Button>
                </Container>
            </td>
        </>
    )
}

export default Issue;