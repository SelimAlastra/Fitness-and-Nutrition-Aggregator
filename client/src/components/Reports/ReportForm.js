import React, {useState} from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  createReport } from "../../actions/reports";

const ReportForm = () => {

    const [ReportData, setReportData] = useState( {reason: '', postId: "6050cb8649b37b0caba750ba", reporterUsername: "@as"} );
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createReport(ReportData));
    }
    
    return(
    <Form onSubmit={handleSubmit} >
        <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
            id="Description"
            name="Description"
            type="text"
            value={ReportData.reason}
            placeholder="Enter Description"
            onChange={(e) => setReportData( { ...ReportData, reason: e.target.value } )}
        />
        </Form.Group>

        <Button variant="primary" type="submit">Create</Button>
    </Form>
    );
}

export default ReportForm;