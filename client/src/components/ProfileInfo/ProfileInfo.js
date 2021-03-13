import Tags from '../Tags/Tags';

function ProfileInfo({profile}) {
    if (profile !== undefined && profile !== null) {
        return (
            <div>
                <div className="profileImage">
                    <img src={"https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}/>
                </div>
                <div>
                    <h2 className="clientName">{profile.name}</h2>
                    <hr className="profileSeperator"/>
                    <p className="textContainer">{profile.username}</p>
                    { generateLocationContainer(profile.address) }
                    { generateDescriptionContainer(profile.bio) }
                    { generateTags(profile.tags) }  
                </div>
                <div data-testid="socialBar">
                        { generateInstagramLink(profile.instagramLink) }
                        { generateYoutubeLink(profile.youtubeLink) }
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
        return <Tags tags={tags}/> ;
    }
}

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