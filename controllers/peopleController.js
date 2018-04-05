var db = require("../models"); //models later on

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
