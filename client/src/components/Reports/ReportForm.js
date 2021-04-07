import React, {useState} from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  createReport } from "../../actions/reports";
import './ReportForm.css'

const ReportForm = (report) => {

    let repData = report.reportData;

    const [ReportData, setReportData] = useState( { reason: '', reporterUsername: repData.reporterUsername, reportedUsername: repData.reportedUsername, postId: repData.postId} );

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createReport(ReportData));
    }
    
    return(
    <Form className ="reportForm1" onSubmit={handleSubmit} >
        <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
            id="Description"
            name="Description"
            type="text"
            value={ReportData.reason}
            placeholder="Enter Description"
            onChange={(e) => setReportData( { ...ReportData, reason: e.target.value } )}
        />
        </Form.Group>
        <Container className ="reportCont">
        <Button className = "reportFormBtn" variant="primary" type="submit">Submit</Button>
        </Container>
    </Form>
    );
}

export default ReportForm;