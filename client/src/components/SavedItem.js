import React from "react";

const SavedItem = props => (
    <span>
        <a href={props.url}>{props.title}</a>
        <button type="button" className="btn btn-danger save-article float-right" onClick={props.onClick}>Remove Article</button>
        {props.children}
    </span>
);

export default SavedItem;