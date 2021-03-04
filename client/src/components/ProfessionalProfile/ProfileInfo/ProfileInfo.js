import React , {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfileInfo.css';
import Tags from '../Tags/Tags';
/*
    ProfileInfo component takes
        - name: String
        - location: String
        - profileImage: String
        - tags: Array[String]
        - instagramLink: String
        - youtubeLink: String
*/
function ProfileInfo(props) {
    return (
        <div>
            <div className="profileImage">
                <img src={props.profileImage}/>
            </div>
            <div className="profileInfo">
                <h2 className="clientName">{props.name}</h2>
                { generateLocationContainer(props.location) }
                { generateDescriptionContainer(props.description) }
                <Tags tags={props.tags}/>   
                <div data-testid="socialBar" className="socialTagBar">
                    { generateInstagramLink(props.instagramLink) }
                    { generateYoutubeLink(props.youtubeLink) }
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;

// Creates the html markup for the location section
function generateLocationContainer(location) {
    if (location !== undefined && location.length > 0) {
        return (<div className="outerContainer"><p className="textContainer">{location}</p></div>);
    }
}

// Creates the html markup for the description section
function generateDescriptionContainer(description) {
    if (description !== undefined && description.length > 0) {
        return (<p className="textContainer">{description}</p>);  
    }
}

// Creates the Instagram icon with the associated
// instagram account page linked
function generateInstagramLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://instagram.com/" + link;
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faInstagram}
        onClick={() => { window.open(url); }}
        />;
    } 
}

// Creates the YouTube icon with the associated
// YouTube account page linked
function generateYoutubeLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://www.youtube.com/" + link;
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faYoutube} 
        onClick={() => { window.open(url); }}
        />
    }
}