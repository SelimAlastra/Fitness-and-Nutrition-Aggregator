import React, {useState} from "react";

function Tags(props) {
    let tags = props.tags;
    if(tags === undefined) {
        return (<div></div>);
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
        return (<div data-testid="tags" className="textContainer" style={{"box-shadow": "0px 0px 9px 0px rgba(220, 143, 102, 1 )"}}>{tagString}</div>);
    }
}

export default Tags;