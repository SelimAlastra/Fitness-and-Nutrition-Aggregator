import './Goal.css';
import './GoalTags.css'



function Goal({goal}) {

    let tags = goal.tags;
    if(tags === undefined) {
        return (
        <div className="goal">
        <p className="goalText">Description : {goal.description}</p>
        <p className="goalText">Deadline : {goal.deadline}</p>
        </div>
        );
    } else {
        let size = 3;
        if (tags.length < 3) size = tags.length;
        let tagString = "";
        for (var i = 0; i < size; ++i) {
            tagString += tags[i];
            if (i < 2 && i < size-1) {
                tagString += " | ";
            }
        }
        return (
            <div className="goal">
            <p className="goalText">Description : {goal.description}</p>
            <p className="goalText">Deadline : {goal.deadline}</p>
            <div data-testid="tags" className="goalTagContainer"> Tags : {tagString}</div>
            </div>
            );
    }

}

export default Goal;