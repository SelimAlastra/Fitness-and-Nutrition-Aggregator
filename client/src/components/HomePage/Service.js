import { Button , Alert, Container, Carousel } from 'react-bootstrap';

function Service({service}) {
    const link =  `/professional/profile/${service.userID}`
    return (
        <div className="service">
            <p className="text">{service.description}</p>
            <p className="text">£{service.price}</p>
            <Button variant="outline-warning" href = {link} > Check profile </Button>
        </div>
    );
}

export default Service;