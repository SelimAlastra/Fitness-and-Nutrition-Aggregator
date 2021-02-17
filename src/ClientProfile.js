import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import Tags from './Tags';
import './ClientProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons"
import Modal from 'react-modal';

/* Properties Accepted:
    - name: String
    - location: String
    - instagramLink: String
    - youtubeLink: String
    - tags: Array[String]
    -goals: Array[String]
*/
export default function ClientProfile(props) {
    const [isOpen, setIsOpen] = useState(false);

    // Opens and closes the popup
    function toggleModalOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="cardHolder">
            <div className="card">
                <div className="profileImage">
                    <img src={props.profileImage} />
                </div>
                <h1>{props.name}</h1>
                <p className="text">{props.location}</p>
                <p>{props.description}</p>
                <div><Tags tags={props.tags}/></div>
                <div className="socialTagBar">
                    { generateInstagramLink(props.instagramLink) }
                    { generateYoutubeLink(props.youtubeLink) }
                </div>
                <p><button onClick={toggleModalOpen}>My Goals</button></p>
                <Modal
                className="modal"
                isOpen={isOpen}
                onRequestClose={toggleModalOpen}
                >
                    <h2>My Goals</h2>
                    <hr/>
                    <button onClick={toggleModalOpen}>Close</button>
                </Modal>
            </div>
        </div>
    );
}

// Creates the Instagram icon with the associated
// instagram account page linked
function generateInstagramLink(link) {
    if (link !== undefined || link !== "") {
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faInstagram}
        onClick={() => {window.open(link);}}
        />;
    }
}

// Creates the YouTube icon with the associated
// YouTube account page linked
function generateYoutubeLink(link) {
    if (link !== undefined || link !== "") {
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faYoutube} 
        onClick={() => {window.open(link);}}
        />
    }
}