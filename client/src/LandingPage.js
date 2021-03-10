import React from "react";
import { Button , Alert, Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

function LandingPage () {
    return (
        <div className = 'landingPage'> 
            <body className = 'body'>   

                <Alert className = 'alert1'> Welcome to our Fitness and Nutrition Aggregator !  </Alert>
                <Alert className = 'alert2'> Please precise us if you are a professional user or not. </Alert>

                <div class="row justify-content-center"
                >     
                    <Button className="button" variant="outline-success"> Basic User </Button>
                    <Button className="button" variant="outline-success" > Professional</Button>
                </div>    

                <Carousel className ="carousel">
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://console.kr-asia.com/wp-content/uploads/2019/12/meghan-holmes-buWcS7G1_28-unsplash.jpg"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3 className = "carouselText">Fitness</h3>
                            <p className = "carouselTextDescription">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://images.everydayhealth.com/images/go-green-for-better-health-00-1440x810.jpg"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3 className = "carouselText">Nutrition</h3>
                            <p className = "carouselTextDescription"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://images.wallpapershd.info/image/wallpaper-paint-grunge-texture-green-1584602104-1600x900.jpg"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3 className = "carouselText">Goals</h3>
                            <p className = "carouselTextDescription">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                </Carousel>
                
            </body>
        </div>
     );
}

export default LandingPage;