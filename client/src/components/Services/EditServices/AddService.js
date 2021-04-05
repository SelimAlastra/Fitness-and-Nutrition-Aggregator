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
    }
    const handleShow = () => setShow(true);

    const [newService, setNewService] = useState({
        description: "",
        price: ""
    });

    const user = JSON.parse(localStorage.getItem('user'));


    function addNewService(event) {
        if (validateFields()) {
            const toAdd = {
                description: newService.description,
                price: newService.price,
                userID: user._id,
                title: newService.title,
                urls: newService.urls
            };
            dispatch(addService(toAdd));
            setNewService({
                description: "",
                price: "",
                title: "",
                urls: []
            });
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
                            onChange={(e) => setNewService({
                                ...newService,
                                title: e.target.value
                            })}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={newService.description}
                            id="descriptionInput"
                            name="description"
                            placeholder="Description"
                            className="inputItem"
                            onChange={(e) => setNewService({
                                ...newService,
                                description: e.target.value
                            })}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={newService.price}
                            id="priceInput"
                            name="price"
                            placeholder="Price"
                            className="inputItem"
                            onChange={(e) => setNewService({
                                ...newService,
                                price: e.target.value
                            })}
                        >
                        </Form.Control>
                    </Form.Group>
                </Form>
                <div className="saveClose">
                    <Button
                        className="actionButton"
                        type="submit"
                        onClick={(event) => addNewService(event)}
                    >
                        Save
                            </Button>
                    <Button
                        className="actionButton"
                        type="button"
                        onClick={(event) => window.location.href = `/professional/services/edit/${user._id}`}
                    >
                        Close
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