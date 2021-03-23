import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState } from 'react';
import { getBasicUser } from '../../actions/basicUsers';
import { getServices } from '../../actions/services';
import { Button, Nav } from 'react-bootstrap';
import '../MyServices/MyServices.css';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import NavbarUser from '../Navbar/NavbarUser';

const MyServices = (props) => {
    const dispatch = useDispatch();
    const userID = props.match.params.id;
    const [modalOpen, setModalOpen] = useState(false);
    Modal.setAppElement('body');

    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        dispatch(getServices());
        dispatch(getBasicUser(userID));
    }, [dispatch]);

    const allServices = useSelector((state) => state.services);
    const basicUser = useSelector((state) => state.basicUsers);

    useEffect(() => {
        if (basicUser !== undefined && allServices !== undefined && basicUser.bundles !== undefined) {
            const filteredServices = allServices.filter(service => basicUser.bundles.includes(service._id));
            setMyServices(filteredServices);
        }
    }, [allServices, basicUser]);

    const [currentService, setCurrentService] = useState({});

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
                                                    <div className="videoView">
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


    if (myServices === undefined || myServices.length === 0 ) {
        return (
            <div>
                <NavbarUser/>
                <p>Sorry, no services can be found!</p>
            </div>
        );
    } else {
        return (
            <div>
                <NavbarUser/>
                <div className="titleText">
                    <h1>My Bundles</h1>
                    <p>These are the bundles you have purchased.</p>
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
                                                <p className="subText">This bundle contains {service.urls.length} videos</p>
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