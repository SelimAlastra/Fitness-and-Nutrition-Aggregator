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
    const userID = props.match.params.id;
    let user;

    useEffect(() => {
        dispatch(getBasicUser(userID));
 
     }, [dispatch]);

    user = useSelector((state) => state.basicUsers);
    const [ID, setID] = useState("");
    
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
                <div className="columnContainer">
                    <div className="column">
                        <ProfileInfo profile={user} />
                    </div>
                    <div className="column">
                        <PersonalInfo profile={user}/>
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
