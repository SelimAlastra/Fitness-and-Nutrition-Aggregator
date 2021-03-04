import React from "react";
import Thumbnail from "./Thumbnail";
import './Thumbnails.css';
function Thumbnails(props) {
    let videos = props.videoUrls;
    if (videos === undefined || videos.length === 0) {
        return (<div><p>Sorry, no videos can be found!</p></div>)
    } else {
        let videosList = videos.map((url, index) => {
           return (<div data-testid={"video" + index }><Thumbnail url={url}/></div>); 
        });
        return (<div className="container">{videosList}</div>);
    }
}

export default Thumbnails;