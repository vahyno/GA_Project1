var db = require('./models');

var seedPeople = [{
  name: 'Koala',
  gender: 'male',
  yearOfBirth: 1976,
  streetAddress: "",
  city: "San Rafael",
  zipcode: "",
  country: "US"
}];

db.Person.remove({}, function(err, removePeople){
  console.log(err);

  db.Person.create(seedPeople, function(err, createdPeople){
    if (err) { return console.log('ERROR', err); }
    console.log("all people:", createdPeople);
    console.log(`You created ${createdPeople.length} people.`)
    process.exit();
  })
})
