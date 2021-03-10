import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getServices } from "../../../actions/services";
import Service from './Service';
import './Services.css';


const Services = ({userID, isProfessional, editLink}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServices());

    }, [dispatch]);

    const services = useSelector((state) => state.services);
    const myServices = services.filter(service => service.userID === userID);

    if (myServices === undefined || myServices.legnth === 0) {
        return (
            <div>
                { generateEditServicesLink(isProfessional) }
                <h2 className="pageText">Services</h2>
                <p>Sorry, no services are being offered at this time!</p>
            </div>
        )
    } else {
        let serviceComponents = myServices.map((service, index) => {
            return (<Service key={index} service={service}/>);
        });
        return (
            <div>
                { generateEditServicesLink(isProfessional) }
                <h2 className="pageText">Services</h2>
                <div className="container">
                    {serviceComponents}
                </div>
            </div>
        );
    }

    function generateEditServicesLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/services/edit/${userID}`}>Edit my services</h5>);
        } 
    }
}

export default Services;