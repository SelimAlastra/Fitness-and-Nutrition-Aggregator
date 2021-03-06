import React, { useEffect, useState } from "react";
import './ProfessionalProfile.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Services from './Services/Services';
import Thumbnails from "./Thumbnails/Thumbnails";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    useEffect(() => {
        dispatch(getProfessional(props.match.params.id));
    }, [dispatch]);
  
    const profile = useSelector((state) => state.professional);


    console.log(name);
    console.log(location);


    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(true);
    const [editDetailsIsOpen, setEditDetailsIsOpen] = useState(false);
    const [editServicesIsOpen, setEditServicesIsOpen] = useState(false);
    Modal.setAppElement('body');

    function handleDetailsFormSubmit(submitEvent) {
        setEditDetailsIsOpen(false);
        window.alert("Updated!");
    }

    function handleServicesFormSubmit(submitEvent) {
        setEditServicesIsOpen(false);
        window.alert("Updated!");
    }

    function generateEditLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => setEditDetailsIsOpen(true)}>Edit my details</h5>);
        }
        // return <h5 className="editLink">
        // <Switch>
        //     <Route exact path="/edit" component={EditProfessionalDetails}>Edit my details</Route>
        // </Switch>
        // </h5>;
    }


    return (
        <div className="sectionContainer">
            <div className="section">
                <div>
                    { generateEditLink(isProfessional)  }
                </div>
                <ProfileInfo profile={profile} />
            </div>
            <div className="section">
                <Services 
                name={name}
                userID={profile._id}
                isProfessional={isProfessional}
                toggleLink={() => setEditServicesIsOpen(!editServicesIsOpen)}
                />
            </div>
            <div className="section">
                <h2 className="pageText">Most Viewed Videos</h2>
                <Thumbnails videoUrls={videoUrls}/>
            </div>
            <Modal
            className="modal"
            isOpen={editDetailsIsOpen}
            onRequestClose={() => setEditDetailsIsOpen(false)}
            >
                <div data-testid="detailsPopup">
                    <h2 className="modalTitle">Edit Details</h2>
                    <hr/><br/>
                    <form onSubmit={handleDetailsFormSubmit}>
                        <div className="formContainer">
                            <label className="inputLabel">Name</label>
                            <input
                            name="name"
                            className="textInput" 
                            value={name} 
                            placeholder="Name" 
                            onChange={(e) => {setName(e.target.value)}}>
                            </input>
                            <label className="inputLabel">Location</label>
                            <input
                            name="location"
                            className="textInput" 
                            value={location} 
                            placeholder="Location" 
                            onChange={(e) => {location =  e.target.value}}>
                            </input>
                            <label className="inputLabel">Description</label>
                            <textarea
                            name="description" 
                            className="textField" 
                            value={description} 
                            placeholder="Description" 
                            onChange={(e) => {setDescription(e.target.value)}}>
                            </textarea>
                            <label className="inputLabel">Instagram Username</label>
                            <input
                            name="instagramLink"
                            className="textInput" 
                            value={instagramLink} 
                            placeholder="Instagram Username" 
                            onChange={(e) => {setInstagramLink(e.target.value)}}>
                            </input>
                            <label className="inputLabel">YouTube Username</label>
                            <input
                            name="youtubeLink"
                            className="textInput" 
                            value={youtubeLink} 
                            placeholder="YouTube Username" 
                            onChange={(e) => {setYoutubeLink(e.target.value)}}>
                            </input>
                            <hr />
                            <div className="buttonsContainer">
                                <input
                                className="submitButton" 
                                type="submit" 
                                value="Submit" 
                                onClick={handleDetailsFormSubmit} 
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
            {/* <Modal
            className="modal"
            isOpen={editServicesIsOpen}
            onRequestClose={() => setEditServicesIsOpen(false)}
            >
                <div data-testid="detailsPopup">
                <h2 className="modalTitle">Add Service</h2>
                <hr />
                <div className="addService">
                        <input
                        id="newServiceInput"
                        name="newService" 
                        placeholder="Service"
                        className="textInput" 
                        />  
                    </div>
                    <div className="buttonsContainer">
                        <input
                        className="submitButton" 
                        type="submit" 
                        value="Submit" 
                        onClick={() => {addService()}} 
                        />
                    </div>
                    <br />
                    <h2 className="modalTitle">Edit Services</h2>
                    <hr/><br/>
                    <div className="services">
                        {createServices(services)}
                    </div>
                    <div className="buttonsContainer">
                        <input
                        className="submitButton" 
                        type="submit" 
                        value="Close" 
                        onClick={() => setEditServicesIsOpen(false)} 
                        />
                    </div>
                </div>
            </Modal> */}
        </div>
    );
        



    // function createServices(services) {
    //     var availableServices = services;
    //     if (availableServices !== undefined && availableServices.length > 0) {
    //         let items = availableServices.map((service, index) => {
    //             return (
    //             <tr
    //             className="serviceCard"
    //             value={service}>
    //                 <td>
    //                     <p style={{
    //                         textAlign:"left",
    //                         padding: "1%"
    //                         }}>{service}</p>
    //                 </td>
    //                 <td>
    //                 <div onClick={() => {
    //                     var newServices = services;
    //                     let index = newServices.indexOf(service);
    //                     if (index !== -1) {
    //                         newServices.splice(index,1);
    //                         setServices([...services]);
    //                         console.log(services);
    //                         // TODO: submit changes to database
    //                     }
    //                 }} 
    //                 value={service}>
    //                 <FontAwesomeIcon 
    //                     icon={faTrashAlt}
    //                     style={{
    //                         textAlign:"right",
    //                         cursor:"pointer"
    //                         }}
    //                     value={service}
    //                     />
    //                 </div>
                    
    //                 </td>     
    //             </tr>
    //             );
    //         });
    //         return (<table>{items}</table>);
    //     } else {
    //         return (<div><p>Sorry, no services can be found!</p></div>);
    //     }
    // }



    // function addService() {
    //     let newService = document.getElementById("newServiceInput").value;
    //     if (newService !== undefined && newService !== "") {
    //         let oldServices = services;
    //         oldServices.push(newService);
    //         console.log( "old " + oldServices);
    //         setServices(oldServices);
    //         document.getElementById("newServiceInput").value = "";
    //         // TODO: write new state to database
    //     }
    // }


}


export default ProfessionalProfile;