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
            <div className="homepage">
            <NavbarUser/>
            <div className="homepage">
                <UserInfo user={user} />
                <hr className ="homePageSep"/>
                <div>
                    <Services userID = {user._id} />
                </div>
                <hr className ="homePageSep"/>
                <div>
                    <Goals userID={user._id}/>
                </div>
                <hr className ="homePageSep"/>
                <div className = "homePageAlertDiv">
                    <h2 className='homePageAlert '> What are smart fitness goals? </h2>
                </div>
                <div>
                    <Image className ="GoalsImage" src="https://www.mileiq.com/en-ca/wp-content/uploads/sites/2/2018/05/SMART-goal-setting-1300x867.jpg" fluid />
                </div>
            </div>
            </div>
            
        );

}

export default HomePage;