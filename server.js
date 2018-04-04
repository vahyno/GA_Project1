//requirements
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var db = require('./models');
var controllers = require('./controllers');

//middleware

//serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.get('/', function (req, res){
  //res.send('hello world to 1st project API')
  res.sendFile('views/index.html', {root: __dirname});
});

app.get('/api/profile', function(req, res){
  res.json({
    name:"Michal & Mark",
    githubUserNames: ["markfdsouza","vahyno"],
    githubLinks: ["https://github.com/markfdsouza","https://github.com/vahyno"],
  })
});

app.get('/api/people', controllers.people.index);//function(req, res){
//   res.send(`you are at api/people`) //testing route
// });



// server start

app.listen(3000, function(){
  console.log('HTTP server listening at localhost:3000');
});
