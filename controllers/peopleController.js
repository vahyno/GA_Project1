var db = require("../models"); //models later on

// var test_people = [{
//   id: 123,
//   name: 'teddy',
//   yearOfBirth: 1976,
//   zipcode: 'prague'
// },
// {
//   id: 124,
//   name: 'bear',
//   yearOfBirth: 1955,
//   zipcode: 'berlin'
// },
// {
//   id: 125,
//   name: 'koala',
//   yearOfBirth: 1960,
//   zipcode: '255 bush street'
// },{
//   id: 126,
//   name: 'monkey',
//   yearOfBirth: 1974,
//   zipcode: 'oakland'
// },
// {
//   id: 127,
//   name: 'huuhu',
//   yearOfBirth: 1900,
//   zipcode: 'madrid'
// },
// {
//   id: 128,
//   name: 'baba',
//   yearOfBirth: 2000,
//   zipcode: 'san rafael, california'
// }];


// GET /api/players
function index(req, res) {
  // res.send(`made it to api/people in controller`)
  // send back all people as JSON
  //res.json(people);
  db.Person.find({}, function(err, allPeople){
    if (err){
      console.log(err)
    } else {
      res.json(allPeople);
    }
  })
}


function create(req, res) {
  // create an album based on request body and send it back as JSON
  console.log(req.body);

  db.Person.create(req.body, function(err, person) {
    if (err) { console.log('error', err); }
    res.json(person);
  });
}

// DELETE /api/people/:personId
function destroy(req, res) {
  // find one person by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/people/:personId
function update(req, res) {
  // find one person by id, update it based on request body,
  // and send it back as JSON
}







module.exports = {
  index: index,
  create: create,
  // destroy: destroy,
  // update: update
}
