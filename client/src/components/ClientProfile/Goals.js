const Goals = ({goals}) => {
    return (
        <div>
            <h3>Goals</h3>
            <hr className="lineSeperator"/>
            { generateGoals() }
        </div>
    );
    
    function generateGoals() {
        if (goals !== undefined && goals.length > 0) {
            return goals.map((goal, index) => {return (<p className="textContainer" key={index}>{goal}</p>)});
        } else {
            return (<div><h3 className="notFound" data-testid="noGoalsMessage">Sorry, you currently have no goals!</h3></div>);
        }
    }
}



export default Goals;