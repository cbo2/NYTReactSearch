import React from "react";

const ResultItem = props => (
    <div>
        <span>
            <p className="float-left col-10">
                <a href={props.url}>{props.title}</a>
            </p>
            <button type="button" className="btn btn-success save-article float-right" onClick={props.onClick}>Save Article</button>
            {props.children}
        </span>
    </div>
);

export default ResultItem;
