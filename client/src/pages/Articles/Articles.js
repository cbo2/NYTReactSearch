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
    background: '#00c2ff',
    color: 'white',
    marginLeft: "20%", marginRight: "20%"
};


class Articles extends Component {
    state = {
        savedArticles: [],
        scrapedArticles: []

    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getSavedArticles()
            .then(res =>
                console.log(`this.setState({ books: res.data, title: "", author: "", synopsis: "" })`)
            )
            .catch(err => console.log(err));
    };

    searchNYT = () => {
        API.getNewArticles()
        .then(res => {
            console.log("***** got back the following from the API call to get artciles: \n" + JSON.stringify(res))
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{ background: "#ffffff"}}>
                <Jumbotron style={jumbotronStyle} className="jumbotron-fluid">
                    <h1 align="center"><u>New York Times Scraper</u></h1>
                    <h3 align="center">Search for and save articles of interest!</h3>
                </Jumbotron>
                {/* <hr style={{ border: "3px double #8c8b8b", marginLeft: "5%", marginRight: "5%"}}></hr> */}

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
                            <Button type="submit" onClick={this.searchNYT()} className="btn btn-success text-center">Submit</Button>
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