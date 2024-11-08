const mongoose = require('mongoose');

let bookModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: Number
},
{
    collection: "Bio_books"
}
);

module.exports = mongoose.model('Book', bookModel);