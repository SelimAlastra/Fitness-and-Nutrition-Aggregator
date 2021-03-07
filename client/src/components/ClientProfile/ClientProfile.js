import React, { useEffect, useState } from "react";
import Tags from "../Tags/Tags";
import "./ClientProfile.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PersonalInfo from '../ClientProfile/PersonalInfo';
import Goals from '../ClientProfile/Goals';

const ClientProfile = (props) => {

    const [user, setUser] = useState({});
  
    useEffect(() => {
        const userID = props.match.params.id;
        if (userID !== undefined) {
            fetch(`http://localhost:5000/basicUsers/${userID}`)
            .then(response => {
                if (!response.ok) return "error";
                else return response.json();
            })
            .then(data => {
                if (data !== "error") {
                    setUser(data)
                } 
            });
        }
    }, []);

    function generateGoals() {
        if (user !== undefined) {
            const goals = user.goals;
            return <Goals goals={goals}/>;
        }
    }
    
    if (user !== undefined) {
        return (
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