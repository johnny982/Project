const mongoose = require('mongoose');

let incidentModel = mongoose.Schema({
    Name: String,
    Time: String,
    Location: String,
    Description: String
},
{
    collection: "Incidents"
}
);

module.exports = mongoose.model('Incident', incidentModel);