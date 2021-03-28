import React, { useEffect, useState } from "react";
import '../Profile.css';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';
import { getServices } from '../../actions/services';
import { updateBasicUser, getBasicUser } from '../../actions/basicUsers';
import { Button } from 'react-bootstrap';
import NavbarUser from "../Navbar/NavbarUser";
import NavbarProfessional from "../Navbar/NavbarProfessional";

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();
    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(null);
    const [basicUserID, setBasicUserID] = useState(null);
    const [professionalUserID, setProfessionalUserID] = useState(null);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')).type === 'client') {
            setBasicUserID(props.match.params.id);
            setProfessionalUserID(props.match.params.professionalID);
            setIsProfessional(false);
        }
        else if (JSON.parse(localStorage.getItem('user')).type === "professional") {
            setProfessionalUserID(props.match.params.id);
            setIsProfessional(true);
        }
    }, []);

    const [basicUser, setBasicUser] = useState({});


    // Get Professional & basic User if a basicUser is viewing the profile
    useEffect(() => {
        dispatch(getProfessional(professionalUserID));
        if(!isProfessional)
            dispatch(getBasicUser(basicUserID));
    }, [dispatch]);

    let professionalUser = useSelector((state) => state.professional);
    let basicUserProfile = useSelector((state) => state.basicUsers);
     useEffect(() => {
         setBasicUser(basicUserProfile);
         
     }, [basicUserProfile]);

     console.log(professionalUser);



     // Get Services
     useEffect(() => {
         dispatch(getServices());
     }, [dispatch]);

    const services = useSelector((state) => state.services);
    const myServices = services.filter(service => service.userID === professionalUserID);
  
    function generateEditDetailsLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/edit/${professionalUser._id}`}>Edit my details</h5>);
        }
    }

    function generateEditServicesLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/services/edit/${professionalUserID}`}>Edit my services</h5>);
        } 
    }

    function purchaseBundle(event) {
        event.preventDefault();
        const bundleID = event.target.value;
        let bundles = basicUser.bundles;
        if (bundleID !== undefined) {
            if (bundles !== undefined) {
                if (!bundles.includes(bundleID)) {
                    bundles.push(bundleID);
                    basicUser.bundles = bundles;
                }
            } else {
                basicUser.bundles = [bundleID];
            }
            // update basicUser
            dispatch(updateBasicUser(basicUser._id, basicUser))
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
                                     <li key={index} className="serviceList">
                                         <div className="serviceColumn">
                                             <h4>{service.title}</h4>
                                             <p>{service.description}</p>
                                         </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                     <h2 className="pageText">Services</h2>
                    <ul>
                        {
                            myServices.map((service, index) => {
                                return (
                                     <li key={index} className="serviceList">
                                         <div className="serviceColumn">
                                            <h4>{service.title}</h4>
                                            <p>{service.description}</p>
                                            <Button 
                                                value={service._id}
                                                className="purchaseButton"
                                                onClick={purchaseBundle}
                                             >
                                                Purchase
                                            </Button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        }
    }

    return (
        <div>
            { generateNavbar() }
            
            <div className="sectionContainer">
                <div className="section">
                    <div>
                        { generateEditDetailsLink(isProfessional)  }
                    </div>
                    <ProfileInfo profile={professionalUser} />
                </div>
                { !professionalUser.isBanned ?
                <div className="section">
                    {
                        generateServices()
                    }
                </div>
                    : <></>
                }
            </div>
        </div>
    );

    function generateNavbar() {
        if (isProfessional) {
            return <NavbarProfessional />;
        } else {
            return <NavbarUser />;
        }
    }
}

export default ProfessionalProfile;