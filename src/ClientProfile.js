import React from 'react';
import Tags from './Tags';
import './ClientProfile.css';
class ClientProfile extends React.Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="profileImage">
                        <img src={this.props.profileImage} />
                    </div>
                    <h1>Joshua Harris</h1>
                    <p className="text">{this.props.location}</p>
                    <p>{this.props.description}</p>
                    <div><Tags tags={this.props.tags}/></div>
                    <p><button>View My Favourites</button></p>
                </div>
            </div>
        );
    }
}

export default ClientProfile;