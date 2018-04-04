var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  name: String,
  yearOfBirth: Number,
  address: String
});

var Person = mongoose.model('Person', PeopleSchema );


module.exports = Person;
