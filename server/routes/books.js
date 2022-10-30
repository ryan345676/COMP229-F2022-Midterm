//Tsang Tsz Long
//301206736
//COMP 229
//22F --Web Application Development (SEC. 004)
//30/10/2022
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/details", { title: "Books", books: new book() });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //redirect to books page
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, editBook) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("books/details", {
        title: "Books",
        books: editBook,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  let id = req.params.id;
  let updateBook = book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  book.updateOne({ _id: id }, updateBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //redirect to books page if book is updated
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;

  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //redirect to books page if book is deleted
      res.redirect("/books");
    }
  });
});

module.exports = router;
