import React, {useState}from 'react';
import Tags from './Tags';
import './ClientProfile.css';
class ClientProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            profileImage: props.profileImage,
            location: props.location,
            description: props.description,
            tags: props.tags
        }
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="profileImage">
                        <img src={this.state.profileImage} />
                    </div>
                    <h1>{this.state.name}</h1>
                    <p className="text">{this.state.location}</p>
                    <p>{this.state.description}</p>
                    <div><Tags tags={this.state.tags}/></div>
                    <p><button>View My Favourites</button></p>
                </div>
            </div>
        );
    }
}

export default ClientProfile;