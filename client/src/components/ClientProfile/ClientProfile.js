import React, { useEffect, useState } from "react";
import Tags from "../Tags/Tags";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PersonalInfo from '../ClientProfile/PersonalInfo';
import Goals from '../ClientProfile/Goals';
import { useDispatch, useSelector } from "react-redux";
import { getBasicUser, getBasicUsers } from "../../actions/basicUsers";
import { getGoals } from '../../actions/goals';
import NavbarUser from "../Navbar/NavbarUser";
import { useRadioGroup } from "@material-ui/core";

const ClientProfile = (props) => {
    const dispatch = useDispatch();
    const userID = props.match.params.id;
    let user;

    useEffect(() => {
        dispatch(getBasicUser(userID));
        dispatch(getGoals());

    }, [dispatch]);

    user = useSelector((state) => state.basicUsers);
    const [ID, setID] = useState("");

    function formatDate(toFormat) {
        if (toFormat !== undefined) {
            const splitDate = toFormat.split("-");
            const year = parseInt(splitDate[0]);
            const month = parseInt(splitDate[1]);
            const day = parseInt(splitDate[2].substring(0, 2));
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
            return <Goals userID={userID} />;
        }
    }

    if (user !== undefined) {
        return (
            <div style={{"overflow-x": "hidden"}}>
                <NavbarUser />
                <div class="row" >
                    <div class="col-sm-10 profileInfo"><ProfileInfo profile={user} /></div>
                </div>
                <div class="row">
                    <div class="col-sm-4 personalInfo"><PersonalInfo profile={user} /></div>
                    <div class="col-sm-4 goals">{generateGoals()}</div>
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
        return <Tags tags={tags} />;
    }
}
