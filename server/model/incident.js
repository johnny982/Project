const mongoose = require('mongoose');

let incidentModel = mongoose.Schema({
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

module.exports = mongoose.model('Incident', incidentModel);