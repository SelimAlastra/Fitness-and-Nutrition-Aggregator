import { Form, Button, Option, Col } from 'react-bootstrap';
import { getBasicUser, updateBasicUser } from '../../actions/basicUsers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../EditFormsStyles.css';
import NavbarUser from '../Navbar/NavbarUser';
import { Grid } from '@material-ui/core';

const EditBasicUser = (props) => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    let profile;

    useEffect(() => {
       dispatch(getBasicUser(props.match.params.id));
    }, [props]);

    profile = useSelector((state) => state.basicUsers);

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
    const[tags,setTags]=useState("");

    useEffect(() => {
        setName(profile.name);
        setUsername(profile.username);
        setEmail(profile.email);
        setAddress(profile.address);
        setGender(profile.gender);
        setBodyType(profile.bodyType);
        setWeight(profile.weight);
        setBio(profile.bio);
        setID(profile._id);
        const date = formatDate(profile.dob);
        setDay(date.day);
        setMonth(date.month);
        setYear(date.year);      
        setTags(profile.tags);
    }, [profile]);

    function handleSubmit(event) {
        event.preventDefault();
        const editForm = event.currentTarget;
        if (editForm.checkValidity()) {
            if (checkEmail(email)) {
                setValidated(true);
                const newBasicUser = {
                    name: name,
                    username: username,
                    email: email,
                    password: profile.password,
                    address: address,
                    gender: gender,
                    bodyType: bodyType,
                    weight: weight,
                    bio: bio,
                    tags: tags,
                    goals: profile.goals,
                    isBanned: profile.isBanned,
                    dob: constructDate(day, month, year),
                    bundles: profile.bundles
                }
                dispatch(updateBasicUser(ID, newBasicUser));
                window.alert("Details Saved!");
            } 
        }
    }

    return (
        <div>
            <NavbarUser />
            <div className="formContainer">
                <h2 className="title">Edit Details</h2>
                <hr className="seperator"/>
                <Grid>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="label">Name</Form.Label>
                                <Form.Control
                                    className="inputItem"
                                    id="name"
                                    value={name}
                                    placeholder="Name" 
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                        <Form.Label className="label">Username</Form.Label>
                        <Form.Control
                            className="inputItem"
                            id="username"
                            value={username}
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label className="label">D.O.B</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    required
                                    className="inputItem"
                                    placeholder="Day"
                                >
                                </Form.Control>  
                            </Col>
                            <Col>
                                <Form.Control
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    required
                                    className="inputItem"
                                    placeholder="Month"
                                >
                                </Form.Control>  
                            </Col>
                            <Col>
                                <Form.Control
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                    className="inputItem"
                                    placeholder="Year"
                                >
                                </Form.Control>  
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control
                            className="inputItem"
                            id="email"
                            value={email}
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Tags</Form.Label>
                        <Form.Control
                            className="inputItem"
                            id="tags"
                            value={tags}
                            placeholder="Tags" 
                            onChange={(e) => setTags(e.target.value.split(','))}
                            required
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Address</Form.Label>
                        <Form.Control
                            className="inputItem"
                            id="address"
                            value={address}
                            placeholder="Address" 
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                            <Form.Label className="label">Body Type</Form.Label>
                            <Form.Control
                                className="inputItem"
                                id="bodyType"
                                value={bodyType}
                                placeholder="Body Type" 
                                onChange={(e) => setBodyType(e.target.value)}
                            >
                        </Form.Control>
                            </Col>
                            <Col>
                            <Form.Group>
                            <Form.Label className="label">Weight</Form.Label>
                            <Form.Control
                                className="inputItem"
                                id="weight"
                                value={weight}
                                placeholder="Weight" 
                                onChange={(e) => setWeight(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label className="label">Gender</Form.Label>
                                <Form.Control
                                as="select"
                                className="inputItem"
                                id="gender"
                                placeholder="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Bio</Form.Label>
                        <Form.Control
                            className="inputItem"
                            as="textarea"
                            id="bio"
                            value={bio}
                            placeholder="Bio"
                            onChange={(e) => setBio(e.target.value)} 
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit"  variant="outline-success" className=" edit actionButton">Save</Button>
                    <Button type="button" variant="outline-success" className="edit actionButton" onClick={() => window.location.href = `/user/profile/${ID}`}>Close</Button>
                </Form>
                </Grid>
                
            </div>
        </div>
    );
}

export default EditBasicUser;


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

function checkEmail(toCheck) {
    if (toCheck === undefined) {
        return false;
    } else {
        return (/[a-zA-Z0-9.-_]@[a-zA-Z0-9.-_]/).test(toCheck);
    }
}

function constructDate(day, month, year) {
    console.log(day + " " + month + " " + year);
    return year + "-" + month + "-" + day;
}