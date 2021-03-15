import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteReport } from "../../../actions/reports";
import { useDispatch } from 'react-redux';

const Report = ({ report }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{report.reporterId}</td>
            <td>{report.reportedId}</td>
            <td>{report.reason}</td>
            <td>{report.postId}</td>
            <td>{report.createdAt}</td>
            <td></td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteReport(report._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>View Post</Button>
                </Container>
            </td>
        </>
    )
}

export default Report;