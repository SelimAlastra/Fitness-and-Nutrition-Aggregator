import React, { useEffect, useState } from "react";
import { Button , Alert, Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { useDispatch, useSelector } from "react-redux";
import { getBasicUser } from "../../actions/basicUsers";
import Goals from './Goals';
import Image from 'react-bootstrap/Image'


const HomePage = (props) => {

    const dispatch = useDispatch();
    let user;

    useEffect(() => {
        dispatch(getBasicUser(props.match.params.id));
     }, [props]);

    user = useSelector((state) => state.basicUsers);

    user = useSelector((state) => state.basicUsers);
    const [name, setName] = useState("");
    const [username, setUsername]= useState("");
    const [gender, setGender] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [weight, setWeight] = useState("");
    const [bio, setBio] = useState("");
    const [ID, setID] = useState("");

    useEffect(() => {
        setName(user.name);
        setUsername(user.username);
        setGender(user.gender);
        setBodyType(user.bodyType);
        setWeight(user.weight);
        setBio(user.bio);
        setID(user._id);
        
    }, [user]);


    function generateGoals() {
        if (user !== undefined && user !== null) {
            const goals = user.goals;
            return <Goals goals={goals}/>;
        }
    }

    if (user !== undefined) {
        return (
            <div className="homepage">
               <Alert className = 'alert1'> Welcome back {user.name} !</Alert>
               <div>
                    <Image className ="GoalsImage" src="https://www.myzerona.com/content/uploads/2019/12/02-What-Are-SMART-Fitness-Goals.jpg" fluid />
               </div>
               <div className="homepageGoals">
                    { generateGoals() }
                </div>
            </div>
        );
    } else {
        return (<div>No profile can be found!</div>);
    };
}

export default HomePage;