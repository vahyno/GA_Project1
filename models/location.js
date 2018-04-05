var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  streetAddress: String,
  city: String,
  zipcode: String,
  country: String
});

var MapLocation = mongoose.model('MapLocation', LocationSchema );


module.exports = MapLocation;
