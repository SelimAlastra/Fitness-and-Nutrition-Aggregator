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

     const [ errors, setErrors ] = useState({})

    const findFormErrors = () => {

        const newErrors = {}
        if ( !deadline || deadline === '' ) newErrors.deadline = 'Name is required!'
        
        if( !description || description === '' ) newErrors.description = 'Description is required!'

        if( !tags || tags === '') newErrors.tags = "Tags are required!"
    
        return newErrors
    }


    useEffect(() => {
        setDescription(goal.description);
        setDeadline(goal.deadline);
        setTags(goal.tags);
        setID(goal._id);
    }, [goal]);

    function handleSubmit(event) {
        event.preventDefault();
        const editGoal = event.currentTarget;
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
             setErrors(newErrors)
        } else {
            const newGoal = {
                description: description,
                deadline: deadline,
                tags : tags
            }
            dispatch(updateGoal(ID, newGoal));
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
                                    isInvalid={ !!errors.description }
                        ></Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.description }
                        </Form.Control.Feedback>
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
                                    isInvalid={ !!errors.deadline }
                        ></Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.deadline }
                        </Form.Control.Feedback>
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
                                    isInvalid={ !!errors.tags }
                        ></Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.tags }
                        </Form.Control.Feedback>
                     </Form.Group>
                    </Col>
                </Form.Row>
                <Button type="submit"  variant="success" className="editGoalsButton2">Save</Button>
            </Form>
        </div>
    );

}

export default EditGoal;