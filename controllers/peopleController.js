var db = require("../models"); //models later on

// GET /api/people
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

// GET /api/people/:personId
function getPersonById(req, res) {
  // res.send(`made it to api/people in controller`)
  // send back all people as JSON
  //res.json(people);
  console.log('params', req.params.id);
  var id=req.params.id;
  db.Person.findById(id, function(err, person){
    if (err){
      console.log(err);
    } else {
      res.json(person);
    }
  });
}

function create(req, res) {
  // create an album based on request body and send it back as JSON
  console.log(req.body);
  // { name: 'Humpty Dumpty2',
  // gender: '',
  // yearOfBirth: '',
  // streetAddress: '1435 mlk',
  // city: '',
  // zipcode: '',
  // country: 'us' }

  db.Person.create({
    name: req.body.name,
    gender: req.body.gender,
    yearOfBirth: req.body.yearOfBirth,
    mapLocation:
    {
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      zipcode: req.body.zipcode,
      country: req.body.country
    }
  }, function(err, person) {
    console.log(person)
    if (err) { console.log('error', err); }
    res.json(person);
  });
}

// DELETE /api/people/:personId
function destroy(req, res) {
  // find one person by id, delete it, and send it back as JSON
  console.log('params', req.params.id);
  var id=req.params.id;
  db.Person.findByIdAndRemove(id, function(err, person){
    if (err) { console.log('error', err); }
    res.json(person);
  });
}

// PUT or PATCH /api/people/:personId
function update(req, res) {
  // find one person by id, update it based on request body,
  // and send it back as JSON
  let formData = req.body;
  console.log('params', req.params.id);
  var id=req.params.id;
  var personToUpdate=req.body;
  console.log('personToUpdate=', personToUpdate);
  db.Person.findByIdAndUpdate(id,personToUpdate,{new:true},function(err, updatedPerson){
    if (err) { console.log('error', err); }
    console.log(`findByIdAndUpdate: ${personToUpdate}\n`);
    console.log(`updatedPerson: ${updatedPerson}`);
    res.json(updatedPerson);
  });
}



module.exports = {
  index: index,
  getPersonById:getPersonById,
  create: create,
  destroy: destroy,
  update: update
}
