var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  id: number,
  name: String,
  yearOfBirth: Number,
  zipcode: String
});

var Person = mongoose.model('Person', PeopleSchema );

model.exports = Person;
