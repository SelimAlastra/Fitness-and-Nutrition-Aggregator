import React, { useEffect, useState } from "react";
import { Button , Alert, Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { useDispatch, useSelector } from "react-redux";
import { getBasicUser } from "../../actions/basicUsers";
import Image from 'react-bootstrap/Image'
import Goals from "./Goals"
import Services from "./Services"
import UserInfo from "./UserInfo"
import { getServices } from '../../actions/services';
import { getGoals } from '../../actions/goals';
import { set } from "mongoose";
import NavbarUser from '../Navbar/NavbarUser';




const HomePage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBasicUser(props.match.params.id));
    }, [dispatch]);

    const user = useSelector((state) => state.basicUsers);
    console.log(user);
    
    // const [name, setName] = useState("");
    // const [address, setAddress] = useState("");
    // const [gender, setGender] = useState("");
    // const [weight, setWeight] = useState("");
    // const [ID, setID] = useState("");

    // useEffect(() => {
    //     setName(user.name);
    //     setAddress(user.address);
    //     setGender(user.gender);
    //     setWeight(user.weight);
    //     setID(user._id);

    // }, [user])

    
        return (
            <div>
            <NavbarUser/>
            <div className="homepage">
                <UserInfo user={user} />
                <div>
                    <Services userID = {user._id} />
                </div>
                <div>
                    <Goals userID={user._id}/>
                </div>
                <div>
                    <Image className ="GoalsImage" src="https://www.verywellmind.com/thmb/Fu42J0v7zBzVwquGqf89B0S13Ts=/1500x1000/filters:fill(ABEAC3,1)/smart-goals-for-lifestyle-change-2224097_final-1e7ebd33b46948959ca5d106f18241ee.png" fluid />
                </div>
            </div>
            </div>
            
        );

}

export default HomePage;