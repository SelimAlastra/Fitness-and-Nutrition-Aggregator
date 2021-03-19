const PersonalInfo = ({profile}) => {
    if (profile !== undefined && profile !== null) {
        return (
            <div>
                <div>
                    <h3>Body Data</h3>
                    <hr className="lineSeperator"/>
                    { getBodyType(profile.bodyType) }
                    { getWeight(profile.weight) }
                    { getGender(profile.gender) }
                </div>
            </div>
        ); 
    } else {
        return (<div><h3 className="notFound" data-testid="noGoalsMessage">Sorry, we can't find your details!</h3></div>)
    }

    function getBodyType(bodyType) {
        if (bodyType !== undefined && bodyType !== null && bodyType !== "") {
            return (
                <p className="textContainer">Body Type: {bodyType}</p>
            );
        }
    }


    function getWeight(weight) {
        if (weight !== undefined && weight !== null && weight !== "") {
            return (
                <p className="textContainer">Body Type: {weight}</p>
            );
        }
    }


    function getGender(gender) {
        if (gender !== undefined && gender !== null && gender !== "") {
            return (
                <p className="textContainer">Gender: {gender}</p>
            );
        }
    }
    
}

export default PersonalInfo;