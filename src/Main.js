import React from 'react';
import {Switch, Route} from 'react-router';
import ClientProfile from './ClientProfile';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <ClientProfile 
                    name="Joshua Harris" 
                    location="London, UK" 
                    description="I am looking for a personal trainer to help acheive my goals!"
                    tags={["#yoga", "#pilates", "#HealthyEating"]}
                    profileImage="https://images.unsplash.com/photo-1582556362337-6a785ee99c63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    instagramLink="https://instagram.com"
                    youtubeLink="https://youtube.co.uk"
                    />
                </Route>
            </Switch>
        </div>
        
    )
}


export default Main;