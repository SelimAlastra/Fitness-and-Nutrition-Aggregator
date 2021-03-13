import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getServices, deleteService } from '../../../actions/services';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import '../../EditFormsStyles.css';
import { Form, Button, Col } from 'react-bootstrap';

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
            </div>
            <Button 
                className="actionButton" 
                onClick={() => window.location.href =`/professional/services/add/${userID}`}
                >
                    Add New Service
                </Button>
        </div>
    );
}

export default EditServices;
