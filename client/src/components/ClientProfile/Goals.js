import { useSelector } from 'react-redux';


const Goals = ({userID}) => {
    const allGoals = useSelector((state) => state.goals);
    const myGoals = allGoals.filter((goal) => goal.userID === userID);
    return (
        <div>
            <h3>Goals</h3>
            <hr className="lineSeperator"/>
            { generateGoals() }
        </div>
    );
    
    function generateGoals() {
        if (myGoals !== undefined && myGoals.length > 0) {
            return myGoals.map((goal, index) => {console.log(goal);return (<p className="textContainer" key={index}>{goal.description}</p>)});
        } else {
            return (<div><h3 className="notFound" data-testid="noGoalsMessage">Sorry, you currently have no goals!</h3></div>);
        }
    } 
}

export default Goals;