import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfessionalProfile.css';
import ProfileInfo from './ProfileInfo';
import Services from './Services';
import Thumbnails from "./Thumbnails";
import Modal from "react-modal";
import ProfessionalProfileForm from "./ProfessionalProfileForm";
/*
    ProfessionalProfile component takes:
        - name: String
        - profileImage: String
        - instagramLink: String
        - youtubeLink: String
        - tags: Array[String]
        - description: String
        - services: Array[String]
        - videoUrls: Array[String]
*/
function ProfessionalProfile(props) {
    Modal.setAppElement('body');
    const [isOpen, setIsOpen] = useState(false);
    // Opens and closes the popup
    function toggleModalOpen() {
        setIsOpen(!isOpen);
    }

    return(
        <div className="sectionContainer">
            <div className="section">
                <div className="">
                    <h5 className="editLink" onClick={toggleModalOpen}>Edit my details</h5>
                </div>
                <ProfileInfo 
                name={props.name}
                location={props.location}
                profileImage={props.profileImage}
                instagramLink={props.instagramLink}
                youtubeLink={props.youtubeLink}
                tags={props.tags}
                description={props.description}
                />
            </div>
            <div className="section">
                <h2 className="pageText">Services</h2>
                <Services services={props.services}/>
            </div>
            <div className="section">
                <h2 className="pageText">Most Viewed Videos</h2>
                <Thumbnails videoUrls={props.videoUrls}/>
            </div>
            <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={toggleModalOpen}
            >
                <div data-testid="detailsPopup">
                    <h2 className="modalTitle">Edit Details</h2>
                    <hr/><br/>
                    <ProfessionalProfileForm 
                    description={props.description}
                    location={props.location}
                    modalFunction={toggleModalOpen}
                    />
                </div>
            </Modal>
        </div>

    );
}

export default ProfessionalProfile;

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