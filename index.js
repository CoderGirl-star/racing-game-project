//Add this code to index.js
// include socket.io and express libraries
let socketio = require("socket.io");
let express = require("express");
let sql = require('sqlite3').verbose()
// create express object
let exp = express();
// use it to serve pages from the web folder
exp.use(express.static("web"));
let web = exp.listen(3000, function () {
  console.log("Running");
});
// initialize the scores table in database
const db = new sql.Database('./frdb.db');
// get socketio to listen to the webserver's connection
let io = socketio(web);
let words = []
let player_ids = []
// Whenever a new connection is made to the io object (i.e. from a web client) this
// It sets up what happens whenever a named message is received
io.on("connection", function (socket) {
  // a new connection has been created i.e. a web browser has connected to the server
  console.log("connected to " + socket.id);
  player_ids.push(socket.id)
  console.log(player_ids)
  

  db.all('SELECT * FROM frenchdb LIMIT 10', (err, rows) => {
    if (err) throw err;
    //console.log(rows);
  });

  //db.close();


  // note when the browser disconnects
  socket.on("disconnect", function () {
    player_ids.pop(socket.id)
    console.log(socket.id + " disconnected");
  });

  
  // this listener deals with the 'newCo' message for coordinates
  socket.on("newCo", function (data) {
    io.emit("coord", data);
    
  });

  socket.on("newColour", function (data) {
    io.emit("colour", data);
  });

  socket.on("lang", function (data) {//query from database, make array of everything, make sentence with FrenchWord if fr, EnglishWord if en
    db.all('SELECT * FROM frenchdb', (err, rows) => {
      if (err) throw err;
        words = []
        words.push(rows)
        let len = words.length
        //console.log(len)
        io.emit('newLang', {w: words, l:len})
        //console.log(words)
    //db.all('SELECT FrenchWord FROM french', (err, rows) => {
            //if (err) throw err;
              //words = []
              //words.push(rows)
              //console.log(words)
              //io.emit('newLang', data)
          
  });
});
  socket.on("pid", function (data) {
    io.emit("id", {playerID: socket.id});
  });
  
  
  });
