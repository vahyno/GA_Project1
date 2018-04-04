var db = require('./models');

var seedPeople = [{
  name: 'teddy',
  yearOfBirth: 1976,
  address: 'prague'
},
{
  name: 'bear',
  yearOfBirth: 1955,
  address: 'berlin'
},
{
  name: 'koala',
  yearOfBirth: 1960,
  address: '255 bush street'
},{
  name: 'monkey',
  yearOfBirth: 1974,
  address: 'oakland'
},
{
  name: 'huuhu',
  yearOfBirth: 1900,
  address: 'madrid'
},
{
  name: 'baba',
  yearOfBirth: 2000,
  address: 'san rafael, california'
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
