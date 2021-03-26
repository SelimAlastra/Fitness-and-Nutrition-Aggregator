import './Service.css';
import { Button } from 'react-bootstrap';

const Service = ({service, userID}) => {
    console.log(userID);
    const link =  `/user/professional/profile/${service.userID}/${userID}`;
    return (
        <div className="homePageService">
            <p className="homePageServiceText">{service.description}</p>
            <p className="homePageServiceText">£{service.price}</p>
            <Button variant="outline-warning" href = {link} > Check profile </Button>
        </div>
    );
}

export default Service;