import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteReport } from "../../../actions/reports";
import { useDispatch } from 'react-redux';

const Report = ({ report }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{report.username}</td>
            <td>{report.description}</td>
            <td></td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteReport(report._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>Reply</Button>
                </Container>
            </td>
        </>
    )
}

export default Report;