import React, { useEffect, useState } from "react";
import './ProfessionalProfile.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Services from './Services/Services';
import Thumbnails from "./Thumbnails/Thumbnails";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';
import { Link } from 'react-router-dom';

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(true);

    useEffect(() => {
        dispatch(getProfessional(props.match.params.id));
    }, [dispatch]);
  
    const profile = useSelector((state) => state.professional);

    Modal.setAppElement('body');

    function generateEditDetailsLink(isProfessional) {
        if (isProfessional) {
            let url = `/professional/profile/edit/${profile._id}`;
            return (<p className="editLink"><Link className="editLink" to={url}>Edit my details</Link></p>)
        }
    }

    return (
        <div className="sectionContainer">
            <div className="section">
                <div>
                    { generateEditDetailsLink(isProfessional)  }
                </div>
                <ProfileInfo profile={profile} />
            </div>
            <div className="section">
                <Services 
                userID={profile._id}
                isProfessional={isProfessional}
                />
            </div>
            <div className="section">
                <h2 className="pageText">Most Viewed Videos</h2>
                <Thumbnails videoUrls={videoUrls}/>
            </div>
        </div>
    );
}

export default ProfessionalProfile;