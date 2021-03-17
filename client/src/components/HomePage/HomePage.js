import React, { useEffect, useState } from "react";
import { Button , Alert, Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { useDispatch, useSelector } from "react-redux";
import { getBasicUser } from "../../actions/basicUsers";
import Image from 'react-bootstrap/Image'
import { getGoalByUserID } from "../../actions/goals";
import Goals from "./Goals"
import UserInfo from "./UserInfo"



const HomePage = (props) => {
    const dispatch = useDispatch();
    let user;

    useEffect(() => {
        dispatch(getBasicUser(props.match.params.id));
     }, [props]);

    user = useSelector((state) => state.basicUsers);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [ID, setID] = useState("");

    useEffect(() => {
        setName(user.name);
        setAddress(user.address);
        setGender(user.gender);
        setWeight(user.weight);
        setID(user._id);

    }, [user])


        return (
            <div className="homepage">
                <UserInfo user={user} />
                <div>
                    <Image className ="GoalsImage" src="https://www.myzerona.com/content/uploads/2019/12/02-What-Are-SMART-Fitness-Goals.jpg" fluid />
                </div>
                <div className="homePagesection">
                    <Goals userID={user._id}/>
                </div>
            </div>
        );

}

export default HomePage;