import React from "react";

const SavedItem = props => (
    <span>
        <a href='#'>Full Story</a>
        <button type="button" class="btn btn-danger save-article float-right">Remove Article</button>
        {props.children}
    </span>
);

export default SavedItem;