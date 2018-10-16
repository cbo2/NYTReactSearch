import React from "react";

const ResultItem = props => (
    <span>
        <a href='#'>Full Story</a>
        <button type="button" class="btn btn-success save-article float-right">Save Article</button>
        {props.children}
    </span>
);

export default ResultItem;
