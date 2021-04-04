import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addService } from '../../../actions/services';
import NavbarProfessional from "../../Navbar/NavbarProfessional";
import './AddService.css';

const AddService = (props) => {
    const dispatch = useDispatch();
    const [newService, setNewService] = useState({
        description: "",
        price: ""
    });

    const userID = props.match.params.id;

    function addNewService(event) {
        const toAdd = {
            description: newService.description,
            price: newService.price,
            userID: userID,
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
        window.location.href = `/professional/services/edit/${userID}`;
    }

    return (
        <div>
            <NavbarProfessional />
            <div className="formContainer" class="container">
                    <h4 className="serviceText">Add Bundle</h4>
                    <hr className="separator" />
                    <div class="row justify-content-center align-items-center">
                        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <Form>
                                <Form.Group>
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
                        </div>
                    </div>
                    <div>
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
                            onClick={(event) => window.location.href = `/professional/profile/${userID}`}
                        >
                            Close
                            </Button>
                    </div>

                </div>
            </div>

    );
}

export default AddService;