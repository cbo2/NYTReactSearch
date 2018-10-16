import axios from "axios";

export default {
  // Gets all Articles
  getSavedArticles: function () {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function (id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  getNewArticles: () => {
    const apiKey = "4b2365b52e4e4dc98d5c8c0eea51fda7"
    let searchTerm = "saudi"
    let beginDate = "20180101"
    let endDate = "20181231"
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${searchTerm}&begin-date=${beginDate}&end_date=${endDate}`
    return axios.get(url)
  }


};