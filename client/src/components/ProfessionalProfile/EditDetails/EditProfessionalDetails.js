import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Option, Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import "../../sharedStyles/EditFormsStyles.css";
import { updateProfessional, getProfessional } from '../../../actions/professionals';
import NavbarProfessional from "../../Navbar/NavbarProfessional";
import axios from 'axios';
import {baseUrl} from '../../../api/index'


const EditProfessionalDetails = (props) => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(new Date());
    const [password, setPassword] = useState("");
    const [isBanned, setIsBanned] = useState(false);
    const [ID, setID] = useState("");
    const [profession, setProfession] = useState("");
    const[tags,setTags]=useState("");
    let professional;
    useEffect(() => {
        dispatch(getProfessional(props.match.params.id));
    }, [props]);

    professional = useSelector((state) => state.professional)

    useEffect(() => {
        setName(professional.name);
        setAddress(professional.address);
        setUsername(professional.username);
        setEmail(professional.email);
        setBio(professional.bio);
        setInstagramLink(professional.instagramLink);
        setYoutubeLink(professional.youtubeLink);
        setGender(professional.gender);
        setDob(professional.dob);
        setPassword(professional.password);
        setIsBanned(professional.isBanned);
        setTags(professional.tags);
        setID(professional._id);
        setProfession(professional.profession);
    }, [professional]);

    function handleSubmit(event) {
        event.preventDefault();
        const editForm = event.currentTarget;
        if (editForm.checkValidity()) {
            const updatedProfile = {
                name: name,
                username: username.toLowerCase(),
                address: address,
                email: email,
                bio: bio,
                instagramLink: instagramLink,
                youtubeLink: youtubeLink,
                gender: gender,
                dob: dob,
                password: password,
                isBanned: isBanned,
                tags: tags,
                profession: profession,
            }
            axios
            .patch(`${baseUrl}/professionalUsers/update/${props.match.params.id}`, updatedProfile)
            .then(res => {
                window.location.href=`/professional/profile/${props.match.params.id}`
                setValidated(true);
            })
            .catch(err => {
                console.log(err)
                if(err.response.data.errors){
                    window.alert(err.response.data.errors)
                }
            })
        } 
        else {
            event.stopPropagation();
        }
    }

    return (
        <div>
            <NavbarProfessional />
            <div className="formContainer">
                <h2 className="title">Edit Details</h2>
                <hr className="seperator"/>
                <div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="label">Name</Form.Label>
                                    <Form.Control 
                                        className="inputItem"
                                        id="name" 
                                        name="name" 
                                        value={name} 
                                        placeholder="Name" 
                                        onChange={(e) => setName(e.target.value)} 
                                        required
                                    />
                            </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="label">Username</Form.Label>
                                    <Form.Control 
                                        className="inputItem"
                                        id="username" 
                                        name="username" 
                                        value={username} 
                                        placeholder="Username" 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row> 
                        
                        <Form.Group>
                            <Form.Label className="label">Address</Form.Label>
                            <Form.Control 
                                className="inputItem"
                                id="address" 
                                name="address" 
                                value={address} 
                                placeholder="Address" 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label className="label">Email</Form.Label>
                            <Form.Control
                                style={{backgroundColor: "white"}}
                                disabled 
                                className="inputItem"
                                id="email" 
                                name="email" 
                                value={email} 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Tags</Form.Label>
                            <Form.Control 
                                className="inputItem"
                                id="tags" 
                                name="tags" 
                                value={tags} 
                                placeholder="Tags" 
                                onChange={(e) => setTags(e.target.value.split(','))} 
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Gender</Form.Label>
                            <Form.Control 
                                className="inputItem"
                                as="select"
                                id="gender" 
                                name="gender" 
                                value={gender} 
                                placeholder="Gender" 
                                onChange={(e) => setGender(e.target.value)} 
                            >
                                <option>Male</option> 
                                <option>Female</option> 
                                <option>Other</option> 
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Bio</Form.Label>
                            <Form.Control 
                                className="inputItem"
                                id="bio" 
                                as="textarea" 
                                name="bio" 
                                value={bio} 
                                placeholder="Bio" 
                                onChange={(e) => setBio(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="label">Instagram Username</Form.Label>
                                    <Form.Control 
                                        className="inputItem"
                                        id="instagramLink" 
                                        name="instagramLink" 
                                        value={instagramLink} 
                                        placeholder="Instagram Username" 
                                        onChange={(e) => setInstagramLink(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="label">YouTube Username</Form.Label>
                                    <Form.Control
                                        className="inputItem" 
                                        id="youtubeLink" 
                                        name="youtubeLink" 
                                        value={youtubeLink} 
                                        placeholder="YoutubeLink" 
                                        onChange={(e) => setYoutubeLink(e.target.value)}    
                                    /><br/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <Button type="submit" variant="outline-success" className="actionButton">Save</Button>
                            <Button type="button" variant="outline-success" className="actionButton" onClick={() => window.location.href=`/professional/profile/${ID}`}>Close</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    ); 
}

export default EditProfessionalDetails;