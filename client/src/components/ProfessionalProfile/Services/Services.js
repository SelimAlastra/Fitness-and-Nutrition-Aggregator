import React from 'react';
import Service from './Service';
import './Services.css';

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: props.services,
            isProfessional: props.isProfessional
        };
    }

    /*
        Adds the 'Edit my services' link to the component
        if the current user is a service provider
    */
   generateEditServicesLink(isProfessional) {
    if (isProfessional) {
        return (<h5 className="editLink" onClick={() => this.props.toggleLink()}>Edit my services</h5>);
    }
}


    render() {
        const services = this.state.services;
        if (services === undefined || services.length === 0) {
            return (
            <div>
            {this.props.serviceLinkMarkup}
            { this.generateEditServicesLink(this.state.isProfessional) }
            <h2 className="pageText">Services</h2>
            <p>Sorry, no services are being offered at this time!</p>
            </div>
            );
        } else {
            let serviceComponents = services.map((service) => {
                return (<Service key={service} serviceInfo={service}/>);
            });
            return (
                <div>
                    { this.generateEditServicesLink(this.state.isProfessional) }
                    <h2 className="pageText">Services</h2>
                    <div className="container">
                        {serviceComponents}
                    </div>
                </div>
            );
        }
    }


}




export default Services;