import { Link } from 'react-router-dom';
import Tags from '../Tags/Tags';

function ProfileInfo({profile}) {
    if (profile !== undefined && profile !== null && !profile.isBanned) {
        return (
            <div style={{"box-shadow": "none"}}>
                <div className="profileImage">
                    <img src={"https://images.unsplash.com/photo-1614854262318-831574f15f1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"}/>
                </div>
                <div>
                    <h2 className="clientName">{profile.name}
                     <p className="minorText" style={{"marginTop": "10px"}}>({profile.username})</p>
                     <p className="minorText">{profile.email}</p>
                    </h2>
                    {profile.bundles !== undefined || profile.buckets !== undefined ?
                    <div><Link to={`/user/myservices/${profile._id}`}> {profile.bundles.length} bundles</Link> · <Link to={`/user/myBuckets/${profile._id}`}>{profile.buckets.length} buckets</Link></div>
                    : <div/>
                    }
                    <hr className="profileSeperator"/>
                    { generateLocationContainer(profile.address) }
                    { generateDescriptionContainer(profile.bio) }
                    { generateTags(profile.tags) } 
                    <p className="helpText"></p> 
                   
                </div>
                <div data-testid="socialBar" style={{"margin":"10px"}} >
                        { generateInstagramLink(profile.instagramLink) }
                        { generateYoutubeLink(profile.youtubeLink) }
                </div>
            </div>
        );
    }else if (profile.isBanned) {
                return (
            <div>
                <div className="profileImage">
                    <img src={"https://images.unsplash.com/photo-1614854262318-831574f15f1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"}/>
                </div>
                <div className="profileInfoDiv">
                    <h2 className="clientName">{profile.name} <p className="minorText">({profile.username})</p></h2>
                    <hr className="profileSeperator"/>
                    <h2>Sorry, this account has been banned</h2>
                    <hr className="profileSeperator"/>
                    <p className="helpText">Location</p>
                    { generateLocationContainer('???') }
                    <p className="helpText">Bio</p>
                    { generateDescriptionContainer('???') }
                    { generateTags('???') } 
                    <p className="helpText">Contact Info</p> 
                    <p className="textContainer">{'???'}</p>
                </div>
                <div data-testid="socialBar">
                </div>
            </div>
        );
    } else {
        return (<div>Sorry, can't find what your looking for!</div>);
    }
}

export default ProfileInfo;

function generateTags(tags) {
    if (tags !== undefined && tags.length > 0) {
        return <Tags tags={tags}/>;
    }
}

function generateLocationContainer(location) {
    if (location !== undefined && location.length > 0) {
        return (
        <div>
            <p className="helpText"></p>
            <div className="outerContainer"><p className="textContainer">Location: {location}</p></div>
        </div>
        );
    }
}

function generateDescriptionContainer(description) {
    if (description !== undefined && description.length > 0) {
        return (
            <div>
                <p className="helpText"></p>
                <p className="textContainer">Bio: {description}</p>
            </div>
        );  
    }
}

function generateInstagramLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://instagram.com/" + link;
        return (
        <img 
            src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
            onClick={() => { window.open(url); }}
            style={{cursor: "pointer"}}
        />
        );
    } 
}

function generateYoutubeLink(link) {
    if (link !== undefined || link === "") {
        const url = "http://www.youtube.com/" + link;
        return (
            <img 
                src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png"
                onClick={() => { window.open(url); }}
                style={{cursor: "pointer"}}
            />
        );
    }
}

// Instagram & YouTube icons from http://www.icons8.com - under free section 