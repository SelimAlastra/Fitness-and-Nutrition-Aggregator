import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState } from 'react';
import { getServices } from '../../actions/services';
import { Button } from 'react-bootstrap';
import '../MyServices/MyServices.css';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'

const MyServices = (props) => {
    const dispatch = useDispatch();
    const userID = props.match.params.id;
    const [modalOpen, setModalOpen] = useState(false);
    Modal.setAppElement('body');

    useEffect(() => {
        dispatch(getServices());
    },[dispatch]);


    const allServices = useSelector((state) => state.services);
    const [myServices, setMyServices] = useState([]);
    const [currentService, setCurrentService] = useState({});

    useEffect(() => {
        const services = allServices.filter(service => service.userID === userID);
        setMyServices(services);
    }, [allServices]);


    function openModal(event, service) {
        setCurrentService(service);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function generatePopup() {
        if (modalOpen && currentService !== undefined) {
            return (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="serviceModal"
                >
                    <div className="closeButton">
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            size="2x"
                            onClick={closeModal}
                        >
                        </FontAwesomeIcon>
                    </div>
                    <div>
                        <h3>{currentService.title}</h3>
                        <hr />
                        <p>{currentService.description}</p>
                        <div>
                            <ul className="serviceList">
                                {
                                    currentService.urls.map((url, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="video">
                                                    <div className="thumbnailVideo">
                                                        <ReactPlayer
                                                            url={url}
                                                            controls={true}
                                                        > 
                                                        </ReactPlayer>
                                                    </div>                  
                                                </div>   
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div> 
                </Modal>
            );
        }
    }


    if (myServices === undefined || myServices === []) {
        console.log("eeheh");
        return (
            <div>
                <p>Sorry, no services can be found!</p>
            </div>
        );
    } else {
        return (
            <div>
                <div className="titleText">
                    <h1>My Services</h1>
                    <hr  className="serviceSeperator"/>
                </div>
                <div>
                    <ul className="serviceList">
                        {
                            myServices.map((service, index) => {
                                return (
                                    <li key={index}>
                                        <div className="serviceCard">
                                            <div className="thumbnailVideo">
                                                <ReactPlayer
                                                    width="60%"
                                                    height="100%"
                                                    url={service.urls[0]}
                                                    controls={true}
                                                > 
                                                </ReactPlayer>
                                            </div>

                                            <div>
                                                <h3>{service.title}</h3>
                                                <br />
                                                <p>{service.description}</p>
                                                <br />
                                                <Button onClick={(e) => openModal(e, service)} className="actionButton">View Videos</Button>
                                            </div>                   
                                        </div>   
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                { generatePopup() }
            </div>
        );
    }
}

export default MyServices;