import { Form, Button, Col } from 'react-bootstrap';
import { updateGoal } from '../../actions/goals';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditGoal.css'

const EditGoal = ({goal}) => {

    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    const [description, setDescription] = useState("");
    const [deadline, setDeadline]= useState("");
    const [tags, setTags]= useState("");
    const [ID, setID] = useState("");


    useEffect(() => {
        setDescription(goal.description);
        setDeadline(goal.deadline);
        setTags(goal.tags);
        setID(goal._id);
    }, [goal]);

    function handleSubmit(event) {
        event.preventDefault();
        const editGoal = event.currentTarget;
        if (editGoal.checkValidity()) {
                setValidated(true);
                const newGoal = {
                    description: description,
                    deadline: deadline,
                    tags : tags
                }
                dispatch(updateGoal(ID, newGoal));
                window.alert("Details Saved!");
            }

    }



    return (
        <div className="goalFormContainer" >
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Col>
                     <Form.Group>
                        <Form.Label className="goalLabel"> Description </Form.Label>
                        <Form.Control
                                    className="goalInputItem"
                                    id="description"
                                    value={description}
                                    placeholder="Description" 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                     <Form.Group>
                        <Form.Label className="goalLabel"> Deadline </Form.Label>
                        <Form.Control
                                    className="goalInputItem"
                                    id="deadline"
                                    value={deadline}
                                    placeholder="Deadline" 
                                    onChange={(e) => setDeadline(e.target.value)}
                                    required
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                     <Form.Group>
                        <Form.Label className="goalLabel"> Tags </Form.Label>
                        <Form.Control
                                    className="goalInputItem"
                                    id="tags"
                                    value={tags}
                                    placeholder="Tags" 
                                    onChange={(e) => setTags(e.target.value)}
                                    required
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                </Form.Row>
                <Button type="submit"  variant="outline-dark" className="goalActionButton">Save</Button>
            </Form>
        </div>
    );

}

export default EditGoal;