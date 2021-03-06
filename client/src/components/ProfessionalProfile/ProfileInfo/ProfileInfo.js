import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfileInfo.css';
import Tags from '../Tags/Tags';

function ProfileInfo({profile, name}) {
    return (
        <div>
            <div className="profileImage">
                <img src={"https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}/>
            </div>
            <div className="profileInfo">
                <h2 className="clientName">{profile.name}</h2>
                <p className="textContainer">{profile.username}</p>
                { generateLocationContainer(profile.address) }
                { generateDescriptionContainer(profile.bio) }
                <Tags tags={profile.tags}/>   
                <div data-testid="socialBar" className="socialTagBar">
                    { generateInstagramLink(profile.instagramLink) }
                    { generateYoutubeLink(profile.youtubeLink) }
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