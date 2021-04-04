import Modal from 'react-modal';
import Audio from '../Audio/Audio';
import {useEffect, useState } from 'react';
import EmbeddedLinks from '../EmbeddedLinks/EmbeddedLinks';
import FacebookLinks from '../FacebookLinks/FacebookLinks';
import Videos from '../Videos/Videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { CardContent, CardMedia, Button } from '@material-ui/core/';
import ReactPlayer from 'react-player';
import './PopUpPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../../actions/professionals';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { getPost } from '../../../api';

const PopUpPost = (post) => {

    const [modalOpen, setModalOpen] = useState(false);
    Modal.setAppElement('body');

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

 return (
     <>
    <Button onClick={(e) => openModal()}>Details</Button>
            <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="postModal"
                >
                    <div className="closeButton">
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            size="2x"
                            onClick={closeModal}
                        >
                        </FontAwesomeIcon>
                    </div>
                        <div className = "title">
                            <h3>{post.post.title}</h3>
                            <h5>{post.post.creator}</h5>
                        </div>
                        <div className = "content">
                            {   post.post.selectedFile ?
                                <CardMedia className = "postDisplay" image={post.post.selectedFile} title={post.post.title} />
                                : <div></div>
                            }
                                {post.post.url ?
                                <CardContent className = "postDisplay">
                                    <ReactPlayer style = {{minWidth : "750px", minHeight : "400px"}} controls url = {post.post.url} /> 
                                </CardContent>
                                : <div></div>
                                }
                            {   post.post.audioFile ?
                                <CardContent className = "postDisplay">
                                <Audio setSrc={post.post.audioFile} />
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.embeddedLink ?
                                <CardContent className = "postDisplay">
                                <EmbeddedLinks setLink={post.post.embeddedLink} />
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.facebookLink ?
                                <CardContent className = "postDisplay">
                                <FacebookLinks setLink={post.post.facebookLink} />
                                </CardContent>
                                : <div></div>
                            }
                        </div> 
                            {post.post.tags.map((tag) => {
                                <ListGroup>
                                    <div>
                                    <ListGroupItem>{tag}</ListGroupItem>
                                    </div>
                                </ListGroup>
                                })
                            }      
                        <h5 style = {{marginTop : "3%"}}>{post.post.message}</h5>
                </Modal>
    </>
    )
}

export default PopUpPost;