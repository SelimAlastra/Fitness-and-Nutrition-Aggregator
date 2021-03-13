import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getServices, deleteService } from '../../../actions/services';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { addService } from '../../../actions/services';
import '../../EditFormsStyles.css';
import { Form, Button } from 'react-bootstrap';

const EditServices = (props) => {
    const [newService, setNewService] = useState({
        description: "",
        price: ""
    });

    const dispatch = useDispatch();
    const userID = props.match.params.id;

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    const services = useSelector((state) => state.services);
   
    const myServices = services.filter(service => service.userID === userID);

    function removeService(toDelete) {
        dispatch(deleteService(toDelete._id));
        myServices.filter(service => service === toDelete);
        window.location.href = `/professional/services/edit/${userID}`;
    }

    function addNewService(event) {
        const toAdd = {
            description: newService.description,
            price: newService.price,
            userID: userID
        };
        dispatch(addService(toAdd));
        setNewService({
            description: "",
            price: ""
        });
        window.location.href = `/professional/services/edit/${userID}`;
    }

    function generateTable() {
        if (myServices === undefined || myServices.length === 0) {
            return (
                <div>
                    <p className="serviceText">Sorry, no services can be found!</p>
                </div>
            );
        } else {
            return (
                <table>
                    <tbody>
                        {
                            myServices.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="servicesContainer">
                                            <p className="serviceText" style={{ textAlign:"left", padding: "1%"}}>{service.description}</p>
                                        </td>
                                        <td>
                                            <div>
                                            <FontAwesomeIcon 
                                                icon={faTrashAlt}
                                                style={{textAlign:"right", cursor:"pointer", color: "black"}}
                                                value={service}
                                                onClick={() => removeService(service)}
                                            />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })      
                        }
                    </tbody>
                </table>
            );
        }
    }

    return (
        <div className="formContainer">
            <h3 className="serviceText">Services</h3>
            <hr className="seperator"/>
            <div>
                { generateTable() }
                <hr className="seperator"/><br />
                <h4 className="serviceText">Add Service</h4>
                <br />
                <div>
                    <Form>
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
    );
}

export default EditServices;
