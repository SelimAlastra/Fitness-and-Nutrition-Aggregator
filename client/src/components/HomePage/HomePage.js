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
import smartgoals from './smartgoals.png';
import NavbarUser from '../Navbar/NavbarUser';




const HomePage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBasicUser(props.match.params.id));
    }, [dispatch]);

    const user = useSelector((state) => state.basicUsers);
    
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
                <div>
                    <Image className ="GoalsImage" src={smartgoals} fluid />
                </div>
            </div>
            </div>
            
        );

}

export default HomePage;