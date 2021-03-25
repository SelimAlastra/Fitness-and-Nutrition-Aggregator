import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteReport } from "../../../actions/reports";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Report = ({ report }) => {

    const dispatch = useDispatch();

    return (
        <>
            <td>{report.reporterUsername}</td>
            <td>{report.reportedUsername}</td>
            <td>{report.reason}</td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteReport(report._id)) }}>Delete</Button> &nbsp;
                    <LinkContainer to={{pathname:"/admin/reports/" + report._id}}>
                    <Button variant="primary">View Full Report</Button>
                    </LinkContainer>
                </Container>
            </td>
        </>
    )
}

export default Report;