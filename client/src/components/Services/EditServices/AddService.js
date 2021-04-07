import { Form, Button, FormCheck } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addService } from '../../../actions/services';
import NavbarProfessional from "../../Navbar/NavbarProfessional";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@material-ui/icons/Close';import './AddService.css';

const AddService = (props) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setNewService({
            description: "",
            price: "",
            title: "",
            urls: []
        });
        setErrors({});
    }
    const handleShow = () => setShow(true);

    const [newService, setNewService] = useState({
        title: "",
        description: "",
        price: ""
    });

    const [ errors, setErrors ] = useState({})

    const findFormErrors = () => {
        const { title, description, price } = newService
        const newErrors = {}
        if ( !title || title === '' ) newErrors.title = 'Name is required!'
        else if( !title || title.length > 15) newErrors.title = 'Name is too long! Maximum 15 characters allowed.'
        
        if( !description || description === '' ) newErrors.description = 'Description is required!'
        else if( !description || description.length > 30) newErrors.description = 'Description is too long! Maximum 30 characters allowed.'

        if( !price || price === '') newErrors.price = "Price is required!"
        else if(!(/^\d+(,\d{1,2})?$/).test(price)) newErrors.price = "Price must be a number!"
    
        return newErrors
    }

    const user = JSON.parse(localStorage.getItem('user'));


    function addNewService(event) {
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
                const toAdd = {
                    description: newService.description,
                    price: newService.price,
                    userID: user._id,
                    title: newService.title,
                    urls: newService.urls
                };
                dispatch(addService(toAdd));
                handleClose();
            }

    }

    return (
        <>
            <Button className="addServiceButton" onClick={handleShow}>Add New Bundle</Button>
            <Modal className="serviceModalAdd" isOpen={show} onHide={handleClose}>
                <div className="closeButton">
                    <CloseIcon
                        size="2x"
                        onClick={handleClose}
                    >
                    </CloseIcon>
                </div>
                <h4 className="serviceText">Add Bundle</h4>
                <hr className="separator" />

                <Form className="addServiceForm">
                    <div className="mandatory" style={{"marginBottom":"10px"}}>All fields are mandatory.</div>
                    <Form.Group class="addServiceGroup">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={newService.title}
                            id="titleInput"
                            name="title"
                            placeholder="Title"
                            className="inputItem"
                            isInvalid={ !!errors.title }
                            onChange={(e) => setNewService({
                                ...newService,
                                title: e.target.value
                            })}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.title }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={newService.description}
                            id="descriptionInput"
                            name="description"
                            placeholder="Description"
                            className="inputItem"
                            isInvalid={ !!errors.description }
                            onChange={(e) => setNewService({
                                ...newService,
                                description: e.target.value
                            })}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.description }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={newService.price}
                            id="priceInput"
                            name="price"
                            placeholder="Price"
                            className="inputItem"
                            isInvalid={ !!errors.price }
                            onChange={(e) => setNewService({
                                ...newService,
                                price: e.target.value
                            })}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            { errors.price }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <div className="save">
                    <Button
                        className="actionButton"
                        type="submit"
                        onClick={(event) => addNewService(event)}
                    >
                        Save
                            </Button>
                </div>
            </Modal>
        </>


    );

    function validateFields() {
        if (newService.description === "" ||
            newService.title === "" || newService.price === "") {
            return false;
        }
        return true;
    }
}

export default AddService;