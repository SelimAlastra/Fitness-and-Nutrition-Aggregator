import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfessionalProfile.css';
import ProfileInfo from './ProfileInfo';
import Services from './Services';
import Thumbnails from "./Thumbnails";
import Modal from "react-modal";

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
        - isProfessional: Boolean
*/
class ProfessionalProfile extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            location: props.location,
            description: props.description,
            profileImage: props.profileImage,
            instagramLink: props.instagramLink,
            youtubeLink: props.youtubeLink,
            tags: props.tags,
            services: props.services,
            videoUrls: props.videoUrls,
            isProfessional: props.isProfessional,
            isOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.toggleModalOpen = this.toggleModalOpen.bind(this);
        this.generateEditLink = this.generateEditLink.bind(this);
        Modal.setAppElement('body');
    }

    /*
        Handles changes to data in the popup form
    */
    handleChange(changeEvent) {
        console.log(changeEvent.target.name);
        this.setState({
            ...this.state,
            [changeEvent.target.name]: changeEvent.target.value
        });
    }

    /*
        Handles the submitting of the form
    */
    handleFormSubmit(submitEvent) {
        this.toggleModalOpen();
        window.alert("Updated!");
    }

    /*
        Toggles the isOpen boolean value which will dictate 
        when the modal is opened or closed
    */
    toggleModalOpen() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }
    /*
        Adds the 'Edit my details' link to the component
        if the current user is a service provider
    */
    generateEditLink(isProfessional) {
        if(isProfessional) {
            return (<h5 className="editLink" onClick={this.toggleModalOpen}>Edit my details</h5>);
        }
    }

    render() {
        return(
            <div className="sectionContainer">
                <div className="section">
                    <div>
                        { this.generateEditLink(this.state.isProfessional) }
                    </div>
                    <ProfileInfo 
                    name={this.state.name}
                    location={this.state.location}
                    profileImage={this.state.profileImage}
                    instagramLink={this.state.instagramLink}
                    youtubeLink={this.state.youtubeLink}
                    tags={this.state.tags}
                    description={this.state.description}
                    />
                </div>
                <div className="section">
                    <h2 className="pageText">Services</h2>
                    <Services services={this.state.services}/>
                </div>
                <div className="section">
                    <h2 className="pageText">Most Viewed Videos</h2>
                    <Thumbnails videoUrls={this.state.videoUrls}/>
                </div>
                <Modal
                className="modal"
                isOpen={this.state.isOpen}
                onRequestClose={this.toggleModalOpen}
                >
                    <div data-testid="detailsPopup">
                        <h2 className="modalTitle">Edit Details</h2>
                        <hr/><br/>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="formContainer">
                                <label className="inputLabel">Name</label>
                                <input
                                name="name"
                                className="textInput" 
                                value={this.state.name} 
                                placeholder="Name" 
                                onChange={this.handleChange}>
                                </input>
                                <label className="inputLabel">Location</label>
                                <input
                                name="location"
                                className="textInput" 
                                value={this.state.location} 
                                placeholder="Location" 
                                onChange={this.handleChange}>
                                </input>
                                <label className="inputLabel">Description</label>
                                <textarea
                                name="description" 
                                className="textField" 
                                value={this.state.description} 
                                placeholder="Description" 
                                onChange={this.handleChange}>
                                </textarea>
                                <label className="inputLabel">Instagram Username</label>
                                <input
                                name="instagramLink"
                                className="textInput" 
                                value={this.state.instagramLink} 
                                placeholder="Instagram Username" 
                                onChange={this.handleChange}>
                                </input>
                                <label className="inputLabel">YouTube Username</label>
                                <input
                                name="youtubeLink"
                                className="textInput" 
                                value={this.state.youtubeLink} 
                                placeholder="YouTube Username" 
                                onChange={this.handleChange}>
                                </input>
                                <hr />
                                <div className="buttonsContainer">
                                    <input
                                    className="submitButton" 
                                    type="submit" 
                                    value="Submit" 
                                    onClick={this.handleFormSubmit} 
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ProfessionalProfile;

/*
    Creates the Instagram icon with the associated
    instagram account page linked
*/
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

/*
    Creates the YouTube icon with the associated
    YouTube account page linked
*/
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