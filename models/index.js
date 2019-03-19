var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project1_map', { useNewUrlParser: true });



var PeopleModel = require('./people.js');
var MapLocationModel = require('./location.js');


module.exports = {
  Person: PeopleModel,
  MapLocation: MapLocationModel,

}
