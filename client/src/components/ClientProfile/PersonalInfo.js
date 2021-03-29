const PersonalInfo = ({profile}) => {
    if (profile !== undefined && profile !== null) {
        return (
            <div>
                <div>
                    <h3>Body Data</h3>
                    <hr className="lineSeperator"/>
                    { generateInfoSection(profile.gender, profile.bodyType, profile.weight) }
                    <br />
                </div>
            </div>
        ); 
    } else {
        return (<div><h3 className="notFound" data-testid="noGoalsMessage">Sorry, we can't find your details!</h3></div>)
    }

    function getBodyType(bodyType) {
        if (bodyType !== undefined && bodyType !== null && bodyType !== "") {
            return (
                <p>Body Type: {bodyType}</p>
            );
        }
    }


    function getWeight(weight) {
        if (weight !== undefined && weight !== null && weight !== "") {
            return (
                <p>Weight: {weight}</p>
            );
        }
    }


    function getGender(gender) {
        if (gender !== undefined && gender !== null && gender !== "") {
            return (
                <p>Gender: {gender}</p>
            );
        }
    }

    function generateInfoSection(gender, bodyType, weight) {
        let weightComponent = getWeight(weight);
        let genderComponent = getGender(gender);
        let bodyTypeComponent = getBodyType(bodyType);
        let parts = [weightComponent, genderComponent, bodyTypeComponent];
        let filtered = parts.filter(part => part !== undefined);
        return (

            <div className="textContainer">
                {
                    filtered.map((item, index) => {
                        return (
                            <div key={index}>
                                {item}
        
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    
}

export default PersonalInfo;