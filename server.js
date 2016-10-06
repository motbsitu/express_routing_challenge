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
// app.post('/', function(req, res){  //
//   console.log(req.body);  //print what is in req.body
//   res.sendStatus(200); //not sending content, but just status code
// });

//make server respond to requests
//handle get requests, arguments: what route (root url '/')& what to do - handler/middleware function
//route
app.get('/', function(req, res){
  //console.log(req); //
   //constructing new date object, response on server tab

//send objects, etc any data, sending response back from server

  //__dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html');
  //console.log('filename', filename);
  res.sendFile(filename);

} );



//place to store - call outside of post request
var songs = [];
//console.log(songs);


app.post('/songs', function(req, res){
  //
  //console.log('filename inside post', filename);
  //console.log('req.body info ', req.body);
  var newSong = req.body;
  //console.log(newSong);

  //It should not allow the user to add empty fields.
    //I don't know how to navigate to html document

    var emptyField = function (){

        if(newSong.title === "" || newSong.artist === "" ){
          res.sendStatus(400);
       }

     else{
       //action - push from req.body to end of array
       findDuplicates(songs);
     }
   };
   emptyField();

  //It should not allow the user to add duplicate songs.
  //THIS DOESN'T DO ANYTHING
  var duplicate = false;

  function findDuplicates(songs){
    for (var i = 0; i < songs.length; i++){
    console.log('in for loop', songs[i]);
      if(newSong.title === songs[i].title && newSong.artist === songs[i].artist ){
        duplicate = true;

     }

   }
   if(duplicate){
     console.log('fail');
     res.sendStatus(400);
   }
   else{
     //action - push from req.body to end of array
    
     newSong.newDate = new Date();
     songs.push(newSong);
     res.sendStatus(200);
   }
 };





//




  //
  // //It should add new property for dateAdded  new Date()
    //THIS DOESN'T DO ANYTHING

  console.log('Received a request at ', newDate);
  //I don't know how to navigate to html document
  // whathere?.getElementById('submit').onclick = newDate;



  //console.log('songs', songs);

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
