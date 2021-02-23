import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons" 
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
            editDetailsIsOpen: false,
            editServicesIsOpen: false
        };
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleServicesChange = this.handleServicesChange.bind(this);
        this.handleServicesFormSubmit = this.handleServicesFormSubmit.bind(this);
        this.handleServicesFormSubmit = this.handleServicesFormSubmit.bind(this);
        this.toggleEditDetails = this.toggleEditDetails.bind(this);
        this.toggleEditServices = this.toggleEditServices.bind(this);
        Modal.setAppElement('body');
    }

    /*
        Handles changes to data in the popup form
    */
    handleDetailsChange(changeEvent) {
        console.log(changeEvent.target.name);
        this.setState({
            ...this.state,
            [changeEvent.target.name]: changeEvent.target.value
        });
    }

    /*
        Handles the submitting of the form
    */
    handleDetailsFormSubmit(submitEvent) {
        this.toggleEditDetails();
        window.alert("Updated!");
    }

    /*
        Handles changes to data in the popup form
    */
    handleServicesChange(changeEvent) {
        // TODO
    }

    /*
        Handles the submitting of the form
    */
    handleServicesFormSubmit(submitEvent) {
        this.toggleEditServices();
        window.alert("Updated!");
    }


    /*
        Toggles the editDetailsIsOpen boolean value which will dictate 
        when the modal is opened or closed
    */
    toggleEditDetails() {
        this.setState({
            ...this.state,
            editDetailsIsOpen: !this.state.editDetailsIsOpen
        });
    }

     /*
        Toggles the editServicesIsOpen boolean value which will dictate 
        when the modal is opened or closed
    */
   toggleEditServices() {
        this.setState({
            ...this.state,
            editServicesIsOpen: !this.state.editServicesIsOpen
        });
    }

    createServices() {
        var services = this.state.services;
        if (services !== undefined && services.length > 0) {
            let items = services.map((service, index) => {
                return (
                <tr
                className="serviceCard"
                value={service}>
                    <td>
                        <p style={{
                            textAlign:"left",
                            padding: "1%"
                            }}>{service}</p>
                    </td>
                    <td>
                    <button onClick={() => {
                        var newServices = this.state.services;
                        let index = newServices.indexOf(service);
                        if (index !== -1) {
                            newServices.splice(index,1);
                            this.setState({...this.state,services: newServices});
                        }
                    }} 
                    name="jis" value={service}>
                    <FontAwesomeIcon 
                        icon={faTrashAlt}
                        style={{
                            textAlign:"right",
                            cursor:"pointer"
                            }}
                        value={service}
                        />
                    </button>
                    
                    </td>     
                </tr>
                );
            });
            return (<table>{items}</table>);
        } else {
            return (<div><p>Sorry, no services can be found!</p></div>);
        }
    }


    /*
        Adds the 'Edit my details' link to the component
        if the current user is a service provider
    */
    generateEditLink(isProfessional) {
        if(isProfessional) {
            return (<h5 className="editLink" onClick={this.toggleEditDetails}>Edit my details</h5>);
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
                    <Services 
                    services={this.state.services} 
                    isProfessional={this.state.isProfessional}
                    toggleLink={this.toggleEditServices}
                    />
                </div>
                <div className="section">
                    <h2 className="pageText">Most Viewed Videos</h2>
                    <Thumbnails videoUrls={this.state.videoUrls}/>
                </div>
                <Modal
                className="modal"
                isOpen={this.state.editDetailsIsOpen}
                onRequestClose={this.toggleEditDetails}
                >
                    <div data-testid="detailsPopup">
                        <h2 className="modalTitle">Edit Details</h2>
                        <hr/><br/>
                        <form onSubmit={this.handleDetailsFormSubmit}>
                            <div className="formContainer">
                                <label className="inputLabel">Name</label>
                                <input
                                name="name"
                                className="textInput" 
                                value={this.state.name} 
                                placeholder="Name" 
                                onChange={this.handleDetailsChange}>
                                </input>
                                <label className="inputLabel">Location</label>
                                <input
                                name="location"
                                className="textInput" 
                                value={this.state.location} 
                                placeholder="Location" 
                                onChange={this.handleDetailsChange}>
                                </input>
                                <label className="inputLabel">Description</label>
                                <textarea
                                name="description" 
                                className="textField" 
                                value={this.state.description} 
                                placeholder="Description" 
                                onChange={this.handleDetailsChange}>
                                </textarea>
                                <label className="inputLabel">Instagram Username</label>
                                <input
                                name="instagramLink"
                                className="textInput" 
                                value={this.state.instagramLink} 
                                placeholder="Instagram Username" 
                                onChange={this.handleDetailsChange}>
                                </input>
                                <label className="inputLabel">YouTube Username</label>
                                <input
                                name="youtubeLink"
                                className="textInput" 
                                value={this.state.youtubeLink} 
                                placeholder="YouTube Username" 
                                onChange={this.handleDetailsChange}>
                                </input>
                                <hr />
                                <div className="buttonsContainer">
                                    <input
                                    className="submitButton" 
                                    type="submit" 
                                    value="Submit" 
                                    onClick={this.handleDetailsFormSubmit} 
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal
                className="modal"
                isOpen={this.state.editServicesIsOpen}
                onRequestClose={this.toggleEditServices}
                >
                    <div data-testid="detailsPopup">
                        <h2 className="modalTitle">Edit Services</h2>
                        <hr/><br/>
                        <div className="services">
                            {this.createServices(this.state.services)}
                        </div>
                        <div className="buttonsContainer">
                        <input
                        className="submitButton" 
                        type="submit" 
                        value="Submit" 
                        onClick={this.handleServicesFormSubmit} 
                        />
                    </div>

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
