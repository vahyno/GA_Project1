var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/project1_map');
mongoose.connect( 'mongodb://localhost/project1_map' );


var PeopleModel = require('./people.js');


module.exports = {
  Person: PeopleModel,
}
