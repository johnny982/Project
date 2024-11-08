var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
// telling router that i have this model
let Book = require('../model/book');
const book = require('../model/book');
let bookController = require('../controllers/book.js')
/* get route for the book list - Read Operation */
// GET, POST, PUT (Edit/Update)

/* Read Operation --> get route for displaying the books list */

router.get('/',async(req,res,next)=>{
try{
    const BookList = await Book.find();
    res.render('Book/list',{
        title:'Books',
        BookList:BookList
    })}
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on server'
        })
    }
    });

/* Create Operation --> get route for displaying the add page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Book/add',{
            title: "Add Book"
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Book/list',{
            error:'Error on server'
        })
    }
});
/* Create Operation --> post route for processing the add page */
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Book({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price,
        })
        Book.create(newBook).then(()=>{
            res.redirect('/bookslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Book/list',{
            error:'Error on server'
        })
    }
});

/* Update Operation --> get route for displaying the edit page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const bookToEdit = await Book.findById(id);
        res.render('Book/edit',
            {
                title:'Edit Book',
                Book:bookToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // keep passing the error
    }
});
/* Update Operation --> post route for processing the edit page */
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedBook = Book({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/bookslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on server'
    })
}
});

/* Delete Operation --> get route to perform delete operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/bookslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on server'
    })
    }
});

    module.exports = router