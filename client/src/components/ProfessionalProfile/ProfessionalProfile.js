import React, { useEffect, useState } from "react";
import '../Profile.css';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import Services from './Services/Services';
import Thumbnails from "./Thumbnails/Thumbnails";
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';
import { Link } from 'react-router-dom';

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();
    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(true);

    useEffect(() => {
        dispatch(getProfessional(props.match.params.id));
    }, [dispatch]);
  
    const profile = useSelector((state) => state.professional);

    function generateEditDetailsLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/profile/edit/${profile._id}`}>Edit my details</h5>);
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