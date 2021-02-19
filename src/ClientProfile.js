import React, { useState } from "react";
import Tags from "./Tags";
import "./ClientProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
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
            <div data-testid="profileCard" className="card">
                <div className="profileImage">
                    <img data-testid="profileImage" src={props.profileImage} />
                </div>
                <h1 data-testid="name" >{props.name}</h1>
                <p data-testid="location" className="text">{props.location}</p>
                <p data-testid="description">{props.description}</p>
                <Tags tags={props.tags}/>
                <div data-testid="socialBar" className="socialTagBar">
                    { generateInstagramLink(props.instagramLink) }
                    { generateYoutubeLink(props.youtubeLink) }
                </div>
                <p><button data-testid="goalsButton" onClick={toggleModalOpen}>My Goals</button></p>
                <Modal
                className="modal"
                isOpen={isOpen}
                onRequestClose={toggleModalOpen}
                >
                    <div data-testid="goalsPopup">
                        <h2>My Goals</h2>
                        <hr/>
                        { generateGoals(props.goals) }
                        <button data-testid="closeButton" onClick={toggleModalOpen}>Close</button>
                    </div>
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
        return (<div><h3 data-testid="noGoalsMessage">Sorry, you currently have no goals!</h3></div>)
    } else {
        let elements = goals.map((element) => (<li data-testid="list-item" key={element} >{element}</li>));
        return (<ul data-testid="goalsList" className="goalsList">{elements}</ul>);
    }
}