import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteIssue } from "../../../actions/issues";
import { useDispatch } from 'react-redux';

const Issue = ({ Issue }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{Issue._id}</td>
            <td>{Issue.Description}</td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteIssue(Issue._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Reply</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Details</Button>
                </Container>
            </td>
        </>
    )
}

export default Issue;