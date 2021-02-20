import React , {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfileInfo.css';
import Tags from './Tags';
/*
    ProfileInfo component takes
        - name: String
        - location: String
        - profileImage: String
        - tags: Array[String]
*/
function ProfileInfo(props) {
    return (
        <div>
            <div className="profileImage">
                <img src={props.profileImage}/>
            </div>
            <div className="profileInfo">
                <h2 className="clientName">{props.name}</h2>
                <div className="outerContainer"><p className="textContainer">{props.location}</p></div>
                <p className="textContainer">{props.description}</p>  
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