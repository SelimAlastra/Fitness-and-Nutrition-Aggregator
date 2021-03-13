import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState } from 'react';
import { getServices } from '../../actions/services';
import { Button } from 'react-bootstrap';
import '../MyServices/MyServices.css';
import ReactPlayer from 'react-player';

const MyServices = (props) => {
    const dispatch = useDispatch();
    const userID = props.match.params.id;

    useEffect(() => {
        dispatch(getServices());
    },[dispatch]);


    const allServices = useSelector((state) => state.services);
    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        const services = allServices.filter(service => service.userID === userID);
        setMyServices(services);
    }, [allServices]);


    if (myServices === undefined || myServices === []) {
        console.log("eeheh");
        return (
            <div>
                <p>Sorry, no services can be found!</p>
            </div>
        );
    } else {
        return (
            <div>
                <div className="titleText">
                    <h1>My Services</h1>
                    <hr  className="serviceSeperator"/>
                </div>
                <div>
                    <ul className="serviceList">
                        {
                            myServices.map((service, index) => {
                                return (
                                    <li key={index}>
                                        <div className="serviceCard">
                                            <div className="thumbnailVideo">
                                                <ReactPlayer
                                                    width="60%"
                                                    height="100%"
                                                    url={service.urls[0]}
                                                > 
                                                </ReactPlayer>
                                            </div>

                                            <div>
                                                <h3>{service.title}</h3>
                                                <br />
                                                <p>{service.description}</p>
                                                <br />
                                                <Button className="actionButton">View Videos</Button>
                                            </div>                   
                                        </div>   
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyServices;