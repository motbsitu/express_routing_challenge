var express = require('express');  //telling what package to require.  gives access to library
var bodyParser = require('body-parser');  //provides middleware, to parse the body.  Take request and take bianary buffer
//in body and
var path = require('path');  //to get to html file

var app = express(); //create new application invoking express

app.use(function(req, res, next){
  console.log('got a request ');
  next();
});

//takes function and apply to any request that comes in.  parses any body
app.use(bodyParser.urlencoded({extended: true}));


//ROUTES:
//needs to come after app.use.  New route
app.post('/', function(req, res){  //
  console.log(req.body);  //print what is in req.body
  res.sendStatus(200); //not sending content, but just status code
});

//make server respond to requests
//handle get requests, arguments: what route (root url '/')& what to do - handler/middleware function
//route
app.get('/', function(req, res){
  //console.log(req); //
  console.log('Received a request at ', new Date());  //constructing new date object, response on server tab

  //res.send('Hello from server ');  //send objects, etc any data, sending response back from server

  //__dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html');
  console.log('filename', filename);
  res.sendFile(filename);

} );

app.get('/kittens', function(req,res){
   //will parse
  console.log('Query params ', req.query);  //give object that contains query parameters that you enter, params on server tab

  if(req.query.age >2){
    res.send('MEOW ');
  }else{
    res.send('meow ');
  }

  //res.send('Meow ');      //in terminal, curl localhost:3000/kittens.  can't call send twice
});

//place to store - call outside of post request
var songs = [];

app.post('/songs', function(req, res){
  //
  console.log('req.body info ', req.body);
  //action - push from req.body to end of array
  songs.push(req.body);
  console.log('songs', songs);
  res.sendStatus(200);
});


//to get songs that are posted
app.get('/songs', function(req, res){
  res.send(songs);
})

//make the public directory available. Middleware for serving static files/assets. Content doesn't
//change when server is running.  html, js, css
app.use(express.static('public'));

app.listen(3000);  //listen for stuff on port 3000.  Also need to add   "start": "node server.js",  in json scripts
