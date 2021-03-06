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
            </div>
            <div data-testid="socialBar">
                    { generateInstagramLink(profile.instagramLink) }
                    { generateYoutubeLink(profile.youtubeLink) }
            </div>
        </div>
    );
}

export default ProfileInfo;

function generateLocationContainer(location) {
    if (location !== undefined && location.length > 0) {
        return (<div className="outerContainer"><p className="textContainer">{location}</p></div>);
    }
}

function generateDescriptionContainer(description) {
    if (description !== undefined && description.length > 0) {
        return (<p className="textContainer">{description}</p>);  
    }
}

function generateInstagramLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://instagram.com/" + link;
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="2x" 
        icon={faInstagram}
        onClick={() => { window.open(url); }}
        />;
    } 
}

function generateYoutubeLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://www.youtube.com/" + link;
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="2x" 
        icon={faYoutube} 
        onClick={() => { window.open(url); }}
        />
    }
}