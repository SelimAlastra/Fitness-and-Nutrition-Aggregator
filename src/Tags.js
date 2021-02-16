import React, {useState} from 'react';
import './Tags.css';
class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.tags
        }
    }
    render() {
        return this.buildMarkup();
    }

    buildMarkup() {
        const tags = this.state.tags;
        let size = 3;
        if (tags.length < 3) size = tags.length;
        let tagString = "";
        for (var i = 0; i < size; ++i) {
            tagString += tags[i];
            if (i < 2) {
                tagString += " | ";
            }
        }
        return (<div className="text">{tagString}</div>);
    }
}

export default Tags;