import React, { useEffect, useState } from "react";
import Tags from "../Tags/Tags";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PersonalInfo from '../ClientProfile/PersonalInfo';
import Goals from '../ClientProfile/Goals';
import { useDispatch, useSelector } from "react-redux";
import { getBasicUser } from "../../actions/basicUsers";
import Navbar from "../Navbar/Navbar";

const ClientProfile = (props) => {
    const dispatch = useDispatch();
    let user;

    useEffect(() => {
        dispatch(getBasicUser(props.match.params.id));
     }, [props]);

    user = useSelector((state) => state.basicUsers);
    const [name, setName] = useState("");
    const [username, setUsername]= useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2021);
    const [gender, setGender] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [weight, setWeight] = useState("");
    const [bio, setBio] = useState("");
    const [ID, setID] = useState("");

    useEffect(() => {
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setAddress(user.address);
        setGender(user.gender);
        setBodyType(user.bodyType);
        setWeight(user.weight);
        setBio(user.bio);
        setID(user._id);
        const date = formatDate(user.dob);
        setDay(user.day);
        setMonth(date.month);
        setYear(date.year);
        
    }, [user]);

    
function formatDate(toFormat) {
    if (toFormat !== undefined) {
        const splitDate = toFormat.split("-");
        const year = parseInt(splitDate[0]);
        const month = parseInt(splitDate[1]);
        const day = parseInt(splitDate[2].substring(0,2));
        return {
           day: day,
           month: month,
           year: year 
        }
    } else {
        return {
            day: 1,
            month: 1,
            year: 2021 
        }
    }
}

    function generateGoals() {
        if (user !== undefined && user !== null) {
            const goals = user.goals;
            return <Goals goals={goals}/>;
        }
    }
    
    if (user !== undefined) {
        return (
            <div>
                <Navbar/>
                <div className="sectionContainer">
                    <div className="section">
                        <ProfileInfo profile={user} />
                    </div>
                    <div className="section">
                        <PersonalInfo profile={user}/>
                    </div>
                    <div className="section">
                        { generateGoals() }
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div>No profile can be found!</div>);
    }
}

export default ClientProfile;

function generateProfilePhoto() {
    return (
        <div className="profileImage">
            <img data-testid="profileImage" src={"https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"} />
        </div>
    );
}

function generateTags(tags) {
    if (tags !== undefined && tags.length !== 0) {
        return <Tags tags={tags}/>;
    }
}
