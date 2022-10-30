//Tsang Tsz Long
//301206736
//COMP 229
//22F --Web Application Development (SEC. 004)
//30/10/2022
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
