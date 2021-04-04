import { Form, Button, FormCheck } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addService } from '../../../actions/services';
import NavbarProfessional from "../../Navbar/NavbarProfessional";

const AddService = (props) => {
    const dispatch = useDispatch();
    const [newService, setNewService] = useState({
        description: "",
        price: ""
    });


    const userID = props.match.params.id;

    function addNewService(event) {
        if (validateFields()) {
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
            window.alert("New Bundle added successfull!");
        }
        
    }

    return (
        <div>
            <NavbarProfessional />
            <div className="formContainer">
                <div>
                    <h4 className="serviceText">Add Bundle</h4>
                    <hr className="seperator"/>
                    <div>
                        <Form>
                            <div>All Fields are mandatory</div>
                            <br />
                            <Form.Group>
                                <Form.Label>Title</Form.Label>  
                                <Form.Control
                                    value={newService.title}
                                    id="titleInput"
                                    name="title" 
                                    placeholder="Title"
                                    className="inputItem" 
                                    required
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
                                    required
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
                                    required
                                    className="inputItem" 
                                    onChange={(e) => setNewService({
                                        ...newService,
                                        price: e.target.value
                                    })}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <div >
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
            </div>
        </div>

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