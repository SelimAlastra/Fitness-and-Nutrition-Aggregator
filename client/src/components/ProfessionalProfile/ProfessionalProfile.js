import React, { useEffect, useState } from "react";
import '../Profile.css';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import Services from './Services/Services';
import Thumbnails from "./Thumbnails/Thumbnails";
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';
import { getServices } from '../../actions/services';

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();
    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(props.isProfessional);
    const [basicUserID, setBasicUserID] = useState("");
    const userID = props.match.params.id;

    useEffect(() => {
        dispatch(getProfessional(userID));
    }, [dispatch]);

    const profile = useSelector((state) => state.professional);

    useEffect(() => {
        dispatch(getServices());

    }, [dispatch]);

    const services = useSelector((state) => state.services);
    const myServices = services.filter(service => service.userID === userID);
  

    function generateEditDetailsLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/profile/edit/${profile._id}`}>Edit my details</h5>);
        }
    }

    function generateEditServicesLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/services/edit/${userID}`}>Edit my services</h5>);
        } 
    }

    function generateServices() {
        if (isProfessional) {
           return (
               <div>
                    { generateEditServicesLink(isProfessional) }
                    <h2 className="pageText">Services</h2>
                   <ul>
                       {
                           myServices.map((service, index) => {
                               return (
                                    <li className="serviceList">
                                        <div className="serviceColumn">
                                            <h4>{service.title}</h4>
                                            <p>{service.description}</p>
                                        </div>
                                        <div className="serviceColumn">
                                            <Button>Purchase Bundle</Button>
                                        </div>
                                   </li>
                               )
                           })
                       }
                   </ul>
               </div>
           );
        } else {
            if (basicUserID !== undefined && basicUserID !== "") {
                // 
            } else {
                // 
            }
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
                {/* <Services 
                userID={profile._id}
                isProfessional={isProfessional}
                /> */}
                {
                    generateServices()
                }
            </div>
            <div className="section">
                <h2 className="pageText">Most Viewed Videos</h2>
                <Thumbnails videoUrls={videoUrls}/>
            </div>
        </div>
    );
}

export default ProfessionalProfile;