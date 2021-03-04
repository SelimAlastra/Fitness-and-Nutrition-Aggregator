import ReactPlayer from "react-player";

function Thumbnail(props) {
    return (
        <div className="container">
            <ReactPlayer 
            url={props.url}
            controls={true}
            width="90%"
            height="40%"
            />
        </div>
    );
}

export default Thumbnail;