// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      //console.log(books); // added to verify that books were being read from the database
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add Book',
    books: ''
   });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = new book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  book.create(newBook,(err,books)=>{
      if(err){
        console.log(err);
        res.end(err);
      }else{
        res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let bookID = req.params.id;

  book.findById(bookID, (err, foundBook)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.render('books/details', {title: "Edit Book", books: foundBook});
    };
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let bookID = req.params.id;

    /*****************
     * ADD CODE HERE *
     *****************/
    let updatedBook = new book({
      "_id": bookID,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    })

    book.updateOne({_id: bookID}, updatedBook, (err)=>{
      if(err){
        console.log(err);
        res.end(err);
      }else{
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
