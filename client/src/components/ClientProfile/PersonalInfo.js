const PersonalInfo = ({profile}) => {
    if (profile !== undefined && profile !== null) {
        return (
            <div>
                <div>
                    <h3 className="titleText">Body Data</h3>
                    <hr className="lineSeperator"/>
                    <p className="textContainer">Body Type: {profile.bodyType}</p>
                    <p className="textContainer">Weight: {profile.weight}</p>
                    <p className="textContainer">Gender: {profile.gender}</p>
                </div>
            </div>
        ); 
    } else {
        return (<div><h3 className="notFound" data-testid="noGoalsMessage">Sorry, we can't find your details!</h3></div>)
    }
    
}

export default PersonalInfo;