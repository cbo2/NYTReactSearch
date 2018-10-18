import React from "react";
import { Row } from "reactstrap";

const SavedItem = props => (
    <div>
        <span>
            <p className="float-left col-10" >
                <a style={{color: "white"}} href={props.url}>{props.title}</a>
            </p>
            <button type="button" className="btn btn-outline-danger save-article float-right" onClick={props.onClick}>Remove Article</button>
            {props.children}
        </span>
    </div>
);

export default SavedItem;