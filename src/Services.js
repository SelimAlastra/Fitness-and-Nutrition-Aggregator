import Service from './Service';
import './Services.css';
function Services(props) {
    const services = props.services;
    if (services === undefined || services.length === 0) {
        return (
        <div>
        <p>Sorry, no services are being offered at this time!</p>
        </div>
        );
    } else {
        let serviceComponents = services.map((service) => {
            return (<Service key={service} serviceInfo={service}/>);
        });
        return (
            <div className="container">
                {serviceComponents}
            </div>
        );
    }
}

export default Services;