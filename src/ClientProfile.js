import React from 'react';

class ClientProfile extends React.Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="profileImage">
                        <img src="https://images.unsplash.com/photo-1582556362337-6a785ee99c63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
                    </div>
                    <h1>Joshua Harris</h1>
                    <p className="title">{this.props.location}</p>
                    <p>{this.props.description}</p>
                    <div><Tags tags={this.props.tags}/></div>
                    <p><button>View My Favourites</button></p>
                </div>
            </div>
        );
    }
}

export default ClientProfile;