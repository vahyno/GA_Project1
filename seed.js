var db = require('./models');

var seedPeople = [
  {
  name: 'Baba Booey',
  gender: 'male',
  yearOfBirth: 1961,
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
    mapLocation:
    { streetAddress : "" ,
      city: "Queens, New York City" ,
      zipcode: "" ,
      country: "US",
    }
  },
  {
    name: 'Method Man',
    gender: 'male',
    yearOfBirth: 1971,
    mapLocation:
    { streetAddress : "" ,
      city: "Town of Hempstead, NY" ,
      zipcode: "" ,
      country: "US",
    }
  },
  {
    name: 'Whitney Cummings',
    gender: 'female',
    yearOfBirth: 1982,
    mapLocation:
    { streetAddress : "Belfield way" ,
      city: "Los Angeles" ,
      zipcode: "" ,
      country: "US",
    }
  },
  {
    name: 'Mark Zuckerberg',
    gender: 'male',
    yearOfBirth: 1984,
    mapLocation:
    { streetAddress : "1456 Edgewood Dr" ,
      city: "Palo Alto" ,
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
