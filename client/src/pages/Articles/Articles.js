import React, { Component } from "react";
import ResultItem from "../../components/ResultItem";
import SavedItem from "../../components/SavedItem";
import API from "../../utils/API";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Jumbotron,
    Form,
    Input,
    Label,
    FormGroup,
    Button,
    Card,
    CardBody
} from "reactstrap";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

const jumbotronStyle = {
    background: 'black',
    color: 'grey'
};


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
            <div style={{ background: "white"}}>
                <Jumbotron style={jumbotronStyle}>
                    <h1 align="center"><u>New York Times Scraper</u></h1>
                    <h3 align="center">Search for and save articles of interest!</h3>
                </Jumbotron>

                <Card style={{ marginLeft: "20%", marginRight: "20%", backgroundColor: 'black', color: 'white' }}>
                    <CardBody>
                        <Form className="justify-content-center" style={{}}>
                            <FormGroup>
                                <Label for="Topic" className="text-bold">Topic</Label>
                                <Input type="input" className="form-control" id="searchTopic" aria-describedby="emailHelp" placeholder="interesting topic...."></Input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label for="startYear">Start Year</Label>
                                <Input type="input" className="form-control" id="startYear" placeholder="2017"></Input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label for="endYear">End Year</Label>
                                <Input type="input" className="form-control" id="endYear" placeholder="2018"></Input>
                            </FormGroup>
                            <Button type="submit" className="btn btn-success text-center">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
                <br></br>

                <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'white' }}>
                    <h3 align="center">Results</h3>
                    <CardBody>
                        <ResultItem></ResultItem>
                    </CardBody>
                </Card>
                <br></br>

               <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'white' }}>
                    <h3 align="center">Saved Articles</h3>
                    <CardBody>
                        <SavedItem></SavedItem>
                    </CardBody>
                </Card>



                <div>We should have loaded the Articles by hitting the back end route by now!</div>
            </div>
        );
    }
}

export default Articles;