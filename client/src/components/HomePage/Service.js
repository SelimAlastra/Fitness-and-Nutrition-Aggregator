import './Service.css';
import { Button , Container } from 'react-bootstrap';


const Service = ({service, userID}) => {
    function link()
    {
    window.location.href = `/user/professional/profile/${service.userID}/${userID}`;
    }
    
    return (
        <div className="homePageService">
            <Container className = "serviceContainer">
            <p className="homePageServiceText">{service.description}</p>
            </Container>
            <p className="homePageServiceText">£{service.price}</p>
            <Button onClick = {() => link()} variant="outline-dark" > Check profile </Button>
        </div>
    );
}

export default Service;