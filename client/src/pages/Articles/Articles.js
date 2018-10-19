import React, { Component } from "react";
import ResultItem from "../../components/ResultItem";
import SavedItem from "../../components/SavedItem";
import API from "../../utils/API";
import './Articles.css';
import {
    Jumbotron,
    Form,
    Input,
    Label,
    FormGroup,
    Button,
    Card,
    CardBody
} from "reactstrap";

const jumbotronStyle = {
    // background: '#00c2ff',
    backgroundImage: `url("/images/newspaper.jpg")`,
    color: 'black',
    marginLeft: "20%", marginRight: "20%"
};


class Articles extends Component {
    state = {
        savedArticles: [],     // the articles that have been saved
        scrapedArticles: [],   // the articles that came back from the NYT api call
        searchTopic: "",       // the search term from the dom
        startYear: "",         // the start year from the dom
        endYear: ""            // the end year from the dom
    };

    componentDidMount() {
        this.loadArticles();
    }

    // load the articles from the mongo db
    loadArticles = () => {
        API.getSavedArticles()
            .then(res =>
                this.setState({ savedArticles: res.data, searchTopic: "", startYear: "", endYear: "" })
            )
            .catch(err => console.log(err));
    };

    // save one article indicated by the arg passed in
    saveArticle = index => {
        console.log(`*** in savedArticle, the value of scrapedArticles is now: ${this.state.scrapedArticles}`)
        API.saveArticle(
            {
                title: this.state.scrapedArticles[index].title,
                url: this.state.scrapedArticles[index].url,
                date: this.state.scrapedArticles[index].date
            })
            .then(res => {
                let articles = this.state.scrapedArticles
                articles.splice(index, 1)  // remove the article from the search list since we just added it to the saved list
                this.setState({ scrapedArticles: articles})
                this.loadArticles()
            })
            .catch(err => console.log(err));
    };

    // delete one article indicated by the id passed in 
    deleteArticle = id => {
        console.log(`*** in deleteArticle, the value of savedArticles is now: ${this.state.savedArticles}`)
        API.deleteArticle(id)
            .then(res =>
                this.loadArticles()
            )
            .catch(err => console.log(err));
    };

    // handle the form search button to kick off the search to the NYT
    handleSearchSubmit = event => {
        event.preventDefault();
        API.getNewArticles({
            searchTopic: this.state.searchTopic,
            startYear: this.state.startYear,
            endYear: this.state.endYear
        })
            .then(res => {
                let newArticles = []
                res.data.response.docs.map((doc, index) => {
                    if (index < 5) {
                        console.log(`===> ${doc.snippet}  :  ${doc.web_url} : ${doc.pub_date}`)
                        newArticles.push({ title: doc.snippet, url: doc.web_url, date: doc.pub_date })
                    }
                    return res
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
                            <Button type="submit" onClick={this.handleSearchSubmit} className="btn btn-outline-light text-center">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
                <br></br>

                <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'grey' }}>
                    <h3 align="center">Search Results</h3>
                    {this.state.scrapedArticles.map((article, index) => (
                        <CardBody key={index}>
                            <ResultItem title={article.title} url={article.url} onClick={() => this.saveArticle(index)}></ResultItem>
                        </CardBody>
                    ))}
                </Card>
                <br></br>

                <Card style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: 'black', color: 'grey' }}>
                    <h3 align="center">Saved Articles</h3>
                    {this.state.savedArticles.map(article => (
                        <CardBody key={article._id}>
                            <SavedItem title={article.title} url={article.url} onClick={() => this.deleteArticle(article._id)} ></SavedItem>
                        </CardBody>
                    ))}
                </Card>
            </div>
        );
    }
}

export default Articles;