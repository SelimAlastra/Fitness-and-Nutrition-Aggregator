import React from 'react';

class Tags extends React.Component {
    render() {
        const tags = this.props.tags;
        for(var i = 0; i < tags.length; ++i) {
            console.log(tags[i]);
        }
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