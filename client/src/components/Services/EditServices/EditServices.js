import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices, deleteService, updateService } from '../../../actions/services';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import VideoCallIcon from '@material-ui/icons/VideoCall'; import '../../EditFormsStyles.css';
import { Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@material-ui/icons/Close';
import NavbarProfessional from "../../Navbar/NavbarProfessional";
import Modal from 'react-modal';
import './EditServices.css';
import ReactPlayer from 'react-player';
import AddService from './AddService.js';


const EditServices = (props) => {

    const dispatch = useDispatch();
    const userID = props.match.params.id;
    const [modalOpen, setModalOpen] = useState(false);
    Modal.setAppElement('body');

    const [serviceID, setServiceID] = useState("");
    const [url, setUrl] = useState("");

    const [ errors, setErrors ] = useState({})

    const findFormErrors = () => {
        const newErrors = {}
        if ( !url || url === '') newErrors.url = 'URL is required!'
        else if(!(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/).test(url)) newErrors.url = 'URL must be valid!'

        return newErrors
    }

    function openModal(event, service) {
        setCurrentService(service);
        setServiceID(service._id);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setErrors({});
    }

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    const [currentService, setCurrentService] = useState({});

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
        if (toUpdate !== undefined && serviceID !== "error") {
            const newErrors = findFormErrors();
            if(Object.keys(newErrors).length > 0) {
                console.log(newErrors);
                setErrors(newErrors);
            }
            else{
                const currentUrls = toUpdate.urls;
                currentUrls.push(url);
                const updatedService = {
                    userID: toUpdate.userID,
                    description: toUpdate.description,
                    title: toUpdate.title,
                    price: toUpdate.price,
                    urls: currentUrls
                }
                setUrl("");
                setServiceID("");
                dispatch(updateService(serviceID, updatedService));
                closeModal();
            }
        }
    }

    function addVideo(service) {
        return (
            <>
                <VideoCallIcon
                    fontSize="large"
                    style={{ textAlign: "right", cursor: "pointer", color: "black", marginTop: "40%" }}
                    value={service}
                    onClick={(e) => openModal(e, service)}
                />

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="serviceModalEdit"
                >
                    <div className="closeButton">
                        <CloseIcon
                            size="2x"
                            onClick={closeModal}
                        >
                        </CloseIcon>
                    </div>
                    <h4>Add Video to Bundle</h4>
                    <hr className="seperator" style={{ "background-color": "#Dc8f66" }} />
                    <br />
                    <Form>
                        <Form.Control class="form-control-static"
                            value={currentService.title}
                            id="serviceIDInput"
                            className="inputItem"
                            placeholder="Service ID"
                        >

                        </Form.Control>
                        <br />
                        <Form.Control
                            value={url}
                            id="urlInput"
                            name="url"
                            placeholder="Video URL"
                            className="inputItem"
                            onChange={(e) => setUrl(e.target.value)}
                            isInvalid={ !!errors.url }
                        >
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.url}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Enter the url of the video you wish to add to the selected bundle.
                        </Form.Text>
                        <br />
                        <Button
                            data-testid="addVideotoBundle" 
                            className="actionButtonEdit"
                            onClick={(e) => addUrl(e)}
                        >
                            Add
                        </Button>
                    </Form>
                </Modal>
            </>

        )

    }

    function generateTable() {
        if (myServices === undefined || myServices.length === 0) {
            return (
                <div>
                    <p style={{ "font-size": "30px" }} className="serviceText">You don't provide any services right now. Create your first one!</p>
                </div>
            );
        } else {
            return (
                <table className="content">
                    <tbody>
                        {
                            myServices.map((service, index) => {
                                return (
                                    <tr className="tableRow" key={index}>
                                        <td width="23%" className="servicesContainer">
                                            <h4 className="serviceText" style={{ textAlign: "centre" }}>{service.title}</h4>
                                            <p className="serviceText" style={{ textAlign: "centre", fontSize: "18px" }}>{service.description}</p>
                                            {/* <p className="subText" style={{ textAlign: "left" }}>Service ID: {service._id}</p> */}
                                        </td>
                                        <td width="70%" className="videoContainer">
                                            <ReactPlayer
                                                width="80%"
                                                height="100%"
                                                url={service.urls[0]}
                                                controls={true}
                                            >
                                            </ReactPlayer>
                                        </td>
                                        <td className="iconsContainer">
                                            <div>
                                                {addVideo(service)}
                                            </div>

                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    size="lg"
                                                    style={{ textAlign: "right", cursor: "pointer", color: "black", marginTop: "10px" }}
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

        <div>
            <NavbarProfessional />
            <div class="container">

                <h3 style={{ marginTop: "20px" }} className="serviceText">Bundles</h3>
                <hr className="seperator" style={{ "background-color": "#Dc8f66" }} />

                <AddService />
                <div>
                    {generateTable()}
                </div>

                <br />
            </div>
        </div>

    );
}

export default EditServices;