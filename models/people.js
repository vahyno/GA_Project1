var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapLocation = require('./location.js')

var PeopleSchema = new Schema({
  name: String,
  gender: String,
  yearOfBirth: Number,
  // streetAddress: String,
  // city: String,
  // zipcode: String,
  // country: String
  mapLocation: MapLocation.schema

});

var Person = mongoose.model('Person', PeopleSchema );


module.exports = Person;
