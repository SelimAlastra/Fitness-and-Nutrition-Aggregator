import React from "react";
import { Alert, Carousel, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import NavbarVisitor from './components/Navbar/NavbarVisitor.js';
import { useHistory } from 'react-router-dom';
import BasicUsers from './components/UsersAuth/clientModal';
import Professional from './components/UsersAuth/professionalModal';
import { Grow, Grid} from '@material-ui/core';

function LandingPage() {

    const history = useHistory();

    const basicUsers = () => {
        let path = `/launch/users`;
        history.push(path);
    }

    const professionalUsers = () => {
        let path = `launch/professionals`;
        history.push(path);
    }

    return (
        <div className='landingPage'>
            <body className='body'>

                {/* <Alert className='alert1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                </Alert>
                <Alert className='alert2'> </Alert> */}

                <Carousel className="carousel">
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100"
                            src="https://console.kr-asia.com/wp-content/uploads/2019/12/meghan-holmes-buWcS7G1_28-unsplash.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption className="caption" class="carousel-caption">
                            <h3 className="carouselText">Fitness</h3>
                            <p className="carouselTextDescription">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100"
                            src="https://images.everydayhealth.com/images/go-green-for-better-health-00-1440x810.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption className="caption" class="carousel-caption">
                            <h3 className="carouselText">Nutrition</h3>
                            <p className="carouselTextDescription"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.wallpapershd.info/image/wallpaper-paint-grunge-texture-green-1584602104-1600x900.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption className="caption" class="carousel-caption">
                            <h3 className="carouselText">Goals</h3>
                            <p className="carouselTextDescription">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <div className="aboutUs">
                        <h2 className="websiteName"> About us ... </h2>
                        <hr />
                        <p className="aboutUsText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. </p>
                    </div>
                    <Grid container justify="center">
                        <Grid item xs= {3}>
                        <BasicUsers className="landingButton1" variant="outline-success" />
                        </Grid>
                        <Grid item xs= {3}>
                        <Professional className="landingButton2" variant="outline-succes" />
                        </Grid>
                    </Grid>
                </div>
            </body>
        </div>
    );
}

export default LandingPage;