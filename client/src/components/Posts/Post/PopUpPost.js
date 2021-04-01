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
                    //className="postModal"
                >
                    <div className="closeButton">
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            size="2x"
                            onClick={closeModal}
                        >
                        </FontAwesomeIcon>
                    </div>
                    <div className = "postDisplay">
                        <h3>{post.post.title}</h3>
                        <h4>{post.post.creator}, {moment(post.post.createdAt).fromNow()}</h4>
                        <p>{post.post.message}</p>
                        <p>{post.post.tags}</p>
                        <div>
                            {   post.post.selectedFile ?
                                <CardMedia image={post.post.selectedFile} title={post.post.title} />
                                : <div></div>
                            }
                                {post.post.url ?
                                <CardContent>
                                    <Videos setUrl={post.post.url} />
                                </CardContent>
                                : <div></div>
                                }
                            </div>
                            {   post.post.audioFile ?
                                <CardContent>
                                <Audio setSrc={post.post.audioFile} />
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.embeddedLink ?
                                <CardContent>
                                <EmbeddedLinks setLink={post.post.embeddedLink} />
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.facebookLink ?
                                <CardContent>
                                <FacebookLinks setLink={post.post.facebookLink} />
                                </CardContent>
                                : <div></div>
                            }
                    </div> 
                </Modal>
    </>
    )
}

export default PopUpPost;