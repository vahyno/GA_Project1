var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  name: String,
  gender: String,
  yearOfBirth: Number,
  streetAddress: String,
  city: String,
  zipcode: String,
  country: String
  // address: String
});

var Person = mongoose.model('Person', PeopleSchema );


module.exports = Person;
