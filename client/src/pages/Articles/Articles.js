import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
    state = {
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                console.log(`this.setState({ books: res.data, title: "", author: "", synopsis: "" })`)
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <container fluid>
                <div>We should have loaded the Articles by hitting the back end route by now!</div>
            </container>
        );
    }
}

export default Articles;