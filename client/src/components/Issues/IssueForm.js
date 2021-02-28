import React, {useState} from 'react';
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  createIssue } from "../../actions/issues";

const IssueForm = () => {

    const [IssueData, setIssueData] = useState( {description: ''} );
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createIssue(IssueData));
    }
    
    return(
    <Form onSubmit={handleSubmit} >
        <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
            id="Discription"
            name="Description"
            type="text"
            value={IssueData.description}
            placeholder="Enter Description"
            onChange={(e) => setIssueData( { ...IssueData, description: e.target.value } )}
        />
        </Form.Group>

        <Button variant="primary" type="submit">Create</Button>
    </Form>
    );
}

export default IssueForm;