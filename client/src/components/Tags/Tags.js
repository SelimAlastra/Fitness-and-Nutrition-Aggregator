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
        return (<div data-testid="tags" className="textContainer" style={{"box-shadow": "0px 0px 9px 0px rgba(155, 218, 142, 1)", "border":"2px solid ##9cbe95 "}}>{tagString}</div>);
    }
}

export default Tags;