const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new object
const ArticleSchema = new Schema({
  // title is a string and must be unique
  title: {
    type: String,
    unique: true
  },
  // article details....
  url: {
    type: String,
    unique: true
  },
  date: {
      type: Date
  }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
