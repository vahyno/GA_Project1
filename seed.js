var db = require('./models');

var seedPeople = [
  {
  name: 'Baba Booey',
  gender: 'male',
  yearOfBirth: 1961,
  //streetAddress: "",
  //city: "San Rafael",
  //zipcode: "",
  //country: "US"
  mapLocation:
    { streetAddress : "" ,
      city: "Greenwich" ,
      zipcode: "" ,
      country: "Connecticut, US",
    }
  },
  {
    name: 'Howard S',
    gender: 'male',
    yearOfBirth: 1954,
    //streetAddress: "",
    //city: "San Rafael",
    //zipcode: "",
    //country: "US"
    mapLocation:
    { streetAddress : "" ,
      city: "Queens, New York City" ,
      zipcode: "" ,
      country: "US",
    }
  }
];


db.Person.remove({}, function(err, removePeople){
  console.log(err);

  db.Person.create(seedPeople, function(err, createdPeople){
    if (err) { return console.log('ERROR', err); }
    console.log("all people:", createdPeople);
    console.log(`You created ${createdPeople.length} people.`)
    process.exit();
  })
})
