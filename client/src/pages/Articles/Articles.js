import React, { Component } from "react";
import ResultItem from "../../components/ResultItem";
import SavedItem from "../../components/SavedItem";
import API from "../../utils/API";
import './Articles.css';
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
        scrapedArticles: [],
        searchTopic: "",
        startYear: "",
        endYear: ""
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getSavedArticles()
            .then(res =>
                this.setState({ savedArticles: res.data, searchTopic: "", startYear: "", endYear: "" })
            )
            .catch(err => console.log(err));
    };

    saveArticle = index => {
        console.log(`*** in savedArticle, the value of scrapedArticles is now: ${this.state.scrapedArticles}`)
        API.saveArticle(
            {
                title: this.state.scrapedArticles[index].title,
                url: this.state.scrapedArticles[index].url
            })
            .then(res =>
                this.loadArticles()
            )
            .catch(err => console.log(err));
    };

    deleteArticle = id => {
        console.log(`*** in deleteArticle, the value of savedArticles is now: ${this.state.savedArticles}`)
        API.deleteArticle(id)
            .then(res =>
                this.loadArticles()
            )
            .catch(err => console.log(err));
    };

    handleSearchSubmit = event => {
        event.preventDefault();
        API.getNewArticles({
            searchTopic: this.state.searchTopic,
            startYear: this.state.startYear,
            endYear: this.state.endYear
        })
            .then(res => {
                let newArticles = []
                console.log("***** got back the following from the API call to get artciles: \n" + JSON.stringify(res))
                res.data.response.docs.map((doc, index) => {
                    if (index < 5) {
                        console.log(`===> ${doc.snippet}  :  ${doc.web_url}`)
                        newArticles.push({ title: doc.snippet, url: doc.web_url })
                    }
                })
                this.setState({ scrapedArticles: newArticles })
                console.log(`*** the value of scrapedArticles should be: ${JSON.stringify(newArticles)}`)
            })
            .catch(err => console.log(err));
    }

    // Generic component state handler when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="newsBackground">
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
                                <Input type="input" className="form-control" name="searchTopic" value={this.state.searchTopic} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="interesting topic...."></Input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label for="startYear">Start Year</Label>
                                <Input type="input" className="form-control" name="startYear" value={this.state.startYear} onChange={this.handleInputChange} placeholder="example...2017"></Input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label for="endYear">End Year</Label>
                                <Input type="input" className="form-control" name="endYear" value={this.state.endYear} onChange={this.handleInputChange} placeholder="example...2018"></Input>
                            </FormGroup>
                            <Button type="submit" onClick={this.handleSearchSubmit} className="btn btn-success text-center">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
                <br></br>

                <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'white' }}>
                    <h3 align="center">Search Results</h3>
                    {this.state.scrapedArticles.map((article, index) => (
                        <CardBody key={index}>
                            <ResultItem title={article.title} url={article.url} onClick={() => this.saveArticle(index)}></ResultItem>
                        </CardBody>
                    ))}
                </Card>
                <br></br>

                <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'white' }}>
                    <h3 align="center">Saved Articles</h3>
                    {this.state.savedArticles.map(article => (
                        <CardBody key={article._id}>
                            <SavedItem title={article.title} url={article.url} onClick={() => this.deleteArticle(article._id)} ></SavedItem>
                        </CardBody>
                    ))}
                </Card>



                <div>We should have loaded the Articles by hitting the back end route by now!</div>
            </div>
        );
    }
}

export default Articles;