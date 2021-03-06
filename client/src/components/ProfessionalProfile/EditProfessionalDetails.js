import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Button, Option } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getProfessional } from '../../actions/professionals';
import "./EditProfessionalDetails.css";
import { updateProfessional } from '../../actions/professionals';

const EditProfessionalDetails = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(new Date());
    const [password, setPassword] = useState("");
    const [isBanned, setIsBanned] = useState(false);
    const [tags, setTags] = useState([]);
    const [ID, setID] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/professionalUsers/" + props.match.params.id)
        .then(response => response.json())
        .then(data => {
            setName(data.name);
            setAddress(data.address);
            setUsername(data.username);
            setEmail(data.email);
            setBio(data.bio);
            setInstagramLink(data.instagramLink);
            setYoutubeLink(data.youtubeLink);
            setGender(data.gender);
            setDob(data.dob);
            setPassword(data.password);
            setIsBanned(data.isBanned);
            setTags(data.tags);
            setID(data._id);
        })
    }, [dispatch]);

    function handleSubmit(event) {
        event.preventDefault();
        const updatedProfile = {
            name: name,
            username: username,
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
        }
        dispatch(updateProfessional(ID, updatedProfile));
        console.log("Saved");
        

    }

    return (
        <div className="formContainer">
            <Form onSubmit={handleSubmit}>
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
                <Form.Group>
                    <Form.Label className="label">Address</Form.Label>
                    <Form.Control 
                        className="inputItem"
                        id="address" 
                        name="address" 
                        value={address} 
                        placeholder="Address" 
                        onChange={(e) => setAddress(e.target.value)} 
                        required
                    />
                </Form.Group>
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
                <Form.Group>
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control 
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
                    <Form.Label className="label">Gender</Form.Label>
                    <Form.Control 
                        className="inputItem"
                        as="select"
                        id="gender" 
                        name="gender" 
                        value={gender} 
                        placeholder="Gender" 
                        onChange={(e) => setGender(e.target.value)} 
                        required
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
                <Form.Group>
                    <Form.Label className="label">Youtube Username</Form.Label>
                    <Form.Control
                        className="inputItem" 
                        id="youtubeLink" 
                        name="youtubeLink" 
                        value={youtubeLink} 
                        placeholder="Youtube Link" 
                        onChange={(e) => setYoutubeLink(e.target.value)}    
                    /><br/>
                    <Button type="submit" className="saveButton">Save</Button>
                </Form.Group>
            </Form>
        </div>
    );


    
}

export default EditProfessionalDetails;
