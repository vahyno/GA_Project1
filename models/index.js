var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/project1_map');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/project1_map' );


var PeopleModel = require('/people.js');


module.exports = {
  People: PeopleModel,
}
