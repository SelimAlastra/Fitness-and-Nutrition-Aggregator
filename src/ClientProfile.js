import React, {useState}from 'react';
import Tags from './Tags';
import './ClientProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"


class ClientProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            profileImage: props.profileImage,
            location: props.location,
            description: props.description,
            tags: props.tags,
            instagramLink: props.instagramLink,
            youtubeLink: props.youtubeLink
        }
    }
    generateInstagramLink() {
        if (this.state.instagramLink !== undefined || this.state.instagramLink === "") {
            return <FontAwesomeIcon 
            className="socialIcon" 
            size="lg" 
            icon={faInstagram}
            onClick={() => {window.open(this.state.instagramLink);}}
            />;
        }
    }

    generateYoutubeLink() {
        if (this.state.youtubeLink !== undefined || this.state.youtubeLink) {
            return <FontAwesomeIcon 
            className="socialIcon" 
            size="lg" 
            icon={faYoutube} 
            onClick={() => {window.open(this.state.youtubeLink);}}
            />
        }
    }

    render() {
        return (
            <div className="cardHolder">
                <div className="card">
                    <div className="profileImage">
                        <img src={this.state.profileImage} />
                    </div>
                    <h1>{this.state.name}</h1>
                    <p className="text">{this.state.location}</p>
                    <p>{this.state.description}</p>
                    <div><Tags tags={this.state.tags}/></div>
                    <div className="socialTagBar">
                        { this.generateInstagramLink() }
                        { this.generateYoutubeLink() }
                    </div>
                    <p><button>Edit My Details</button></p>
                </div>
            </div>
        );
    }
}

export default ClientProfile;