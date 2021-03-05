import './Service.css';

function Service({service}) {
    return (
        <div className="service">
            <p className="text">{service.description}</p>
            <p className="text">£{service.price}</p>
        </div>
    );
}

export default Service;