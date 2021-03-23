import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../actions/services';
import Service from './Service';


const Services = () => {
        
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch])

    const services = useSelector((state) => state.services);

    const shuffled = services.sort(() => 0.5 - Math.random());
    const myServices = shuffled.slice(0, 3);

    

    if (myServices === undefined || myServices.legnth === 0) {
        return (
            <div>
                <h2 className="pageText">Services</h2>
                <p>Sorry, no services are being offered at this time!</p>
            </div>
        )
    } else {
        let serviceComponents = myServices.map((service,index) => {
            return (
            <Service key={index} service={service}/>
            );
        });
        return (
            <div>
                <h2 className="pageText">Services you may like</h2>
                <div className="container">
                    {serviceComponents}
                </div>
            </div>
        );
    }
    
}



export default Services;