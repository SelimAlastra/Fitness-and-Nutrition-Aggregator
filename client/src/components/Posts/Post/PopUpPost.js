import Modal from 'react-modal';
import {useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { CardContent, CardMedia, Button, Typography, Link } from '@material-ui/core/';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import Iframe from 'react-iframe';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './PopUpPost.css';
import { useDispatch, useSelector } from 'react-redux';
import {Likes, ReportPopUp, PopUpBuckets} from './Post';
import { likePost } from '../../../actions/posts';

const PopUpPost = (post) => {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    Modal.setAppElement('body');

    const professional = useSelector((state) => state.professional)

    let professionals;

    if(professional !== null){
        professionals = professional.filter(professional => professional._id == post.post.userFrom)
    }

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

 return (
     <>
    <Button onClick={(e) => openModal()}><HelpOutlineIcon/></Button>
            <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="postModal"
                >
                    <div className="closeButton">
                        <CloseIcon
                            onClick={closeModal}
                        >
                        </CloseIcon>
                    </div>
                            <h4>{post.post.title}</h4>
                            { (professional !== null && professionals[0] !== undefined) ?
                            <Link onClick={() => window.location.href = `/user/professional/profile/${post.post.userFrom}/${JSON.parse(localStorage.getItem('user'))._id}`} style={{ "color": "black", "cursor": "pointer" }}><h6>{post.post.creator} - {professionals[0].profession}</h6></Link>
                            :
                            null
                            }   
                            {post.post.likes ?
                                <Button size="small" onClick={() => dispatch(likePost(post.post._id, JSON.parse(localStorage.getItem('user'))._id))}>
                                    <Likes post = {post.post}/>
                                </Button>
                                : <> </>
                            }
                            <PopUpBuckets post = {post.post}/>
                            <ReportPopUp post = {post.post}/>
                        <hr style = {{backgroundColor : "#Dc8f66" , width: "800px"}}/>
                        
                        <div className = "content">
                            {   post.post.selectedFile ?
                                <CardContent className = "postDisplay">
                                    <CardMedia style={{width: "750px", height:"400px"}} image={post.post.selectedFile} title={post.post.title} />
                                </CardContent>
                                : <div></div>
                            }
                                {post.post.url ?
                                <CardContent className = "postDisplay">
                                    <ReactPlayer width = "750px" height = "400px" controls url = {post.post.url} /> 
                                </CardContent>
                                : <div></div>
                                }
                            {   post.post.embeddedLink ?
                                <CardContent className = "postDisplay">
                                    <Iframe width = "750px" height = "400px" url = {post.post.embeddedLink} position="relative" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/> 
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.audioFile ?
                                <CardContent className = "postDisplay">
                                    <ReactAudioPlayer width = '382px' minHeight = '200px' src = {post.post.audioFile} autoPlay controls/> 
                                </CardContent>
                                : <div></div>
                            }
                            {   post.post.facebookLink ?
                                <CardContent className = "postDisplay">
                                    <Iframe url = {post.post.facebookLink} width="750px" height="500px" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/> 
                                </CardContent>
                                : <div></div>
                            }
                        </div> 
                        <Typography variant="body2" color="textSecondary" component="h2">{post.post.tags.map((tag) => `#${tag} `)}</Typography>
                        <div className = "postContent">
                        <Typography component="h2" variant="h6" style = {{marginTop : "1%", maxWidth: "700px"}}>{post.post.message}</Typography>
                        </div>
                </Modal>
    </>
    )
}

export default PopUpPost;