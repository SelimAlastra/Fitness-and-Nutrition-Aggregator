import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getServices, deleteService, updateService } from '../../../actions/services';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import '../../EditFormsStyles.css';
import { Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'

const EditServices = (props) => {

    const dispatch = useDispatch();
    const userID = props.match.params.id;

    const [serviceID, setServiceID] = useState("");
    const [url, setUrl] = useState("");

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

    function addUrl(e) {
        e.preventDefault();
        const toUpdate = myServices.filter(sev => sev._id === serviceID)[0];
        const currentUrls = toUpdate.urls;
        currentUrls.push(url);
        const updatedService = {
            userID: toUpdate.userID,
            description: toUpdate.description,
            title: toUpdate.title,
            price: toUpdate.price,
            urls: currentUrls
        }
        dispatch(updateService(serviceID, updatedService));
        setUrl("");
        setServiceID("");
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
                                            <h4 className="serviceText" style={{ textAlign:"left"}}>{service.title}</h4>
                                            <p className="serviceText" style={{ textAlign:"left"}}>{service.description}</p>
                                            <p className="subText" style={{ textAlign:"left"}}>Service ID: {service._id}</p>
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
            <div className="closeButton">
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            size="2x"
                            onClick={() => window.location.href = `/professional/profile/${userID}`}
                        >
                        </FontAwesomeIcon>
                    </div>
            <h3 className="serviceText">Services</h3>
            <hr className="seperator"/>
            <div>
                { generateTable() }
            </div>
            <Button 
                className="actionButton" 
                onClick={() => window.location.href =`/professional/services/add/${userID}`}
                >
                    Add New Service
            </Button>
            <br />
            <hr  className="seperator"/>
            <h4>Add URL to Service</h4>
            <br />
            <Form>             
                    <Form.Control
                        value={serviceID}
                        id="serviceIDInput"
                        className="inputItem"
                        onChange={(e) => setServiceID(e.target.value)}
                        placeholder="Service ID"
                    >
                    </Form.Control>     
                    <br />       
                    <Form.Control
                        value={url}
                        id="urlInput"
                        name="url" 
                        placeholder="New URL"
                        className="inputItem"
                        onChange={(e) => setUrl(e.target.value)} 
                    >
                    </Form.Control>   
                    <br />                            
                    <Button 
                        className="actionButton"
                        onClick={(e) => addUrl(e)}
                    >
                        Add
                    </Button>                 
            </Form>
        </div>
    );
}

export default EditServices;
