import React from "react";

const ResultItem = props => (
    <span>
        <a href={props.url}>{props.title}</a>
        <button type="button" className="btn btn-success save-article float-right" onClick={props.onClick}>Save Article</button>
        {props.children}
    </span>
);

export default ResultItem;
