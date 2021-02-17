import React, { useState } from "react";
import Tags from "./Tags";
import "./ClientProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons"
import Modal from "react-modal";

/* Properties Accepted:
    - name: String
    - location: String
    - instagramLink: String
    - youtubeLink: String
    - tags: Array[String]
    - goals: Array[String]
*/
function ClientProfile(props) {
    Modal.setAppElement('body');
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
                    { generateGoals(props.goals) }
                    <button onClick={toggleModalOpen}>Close</button>
                </Modal>
            </div>
        </div>
    );
}

export default ClientProfile;

// Creates the Instagram icon with the associated
// instagram account page linked
function generateInstagramLink(link) {
    if (link !== undefined || link === "") {
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
    if (link !== undefined || link === "") {
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faYoutube} 
        onClick={() => { window.open(link); }}
        />
    }
}

// Creates a dynamic list of goals
function generateGoals(goals) {
    if (goals === undefined || goals.length === 0) {
        return (<div><h3>Sorry, you currently have no goals!</h3></div>)
    } else {
        let elements = goals.map((element) => (<li>{element}</li>));
        return (<ul className="goalsList">{elements}</ul>);
    }
}