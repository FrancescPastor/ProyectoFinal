var express = require('express');
var app = express();
const path = require ("path");
const fs = require ("fs");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var port = 8888;
var io = require('socket.io').listen(app.listen(port));
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';

//Aqui ponemos la ruta
app.get("/alumno", (req, res)=>{
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../vistas', 'alumno.html'));

})

//Esto es para hacer que vaya el vuejs y se ha de poner debajo de las rutas !!siempre!!
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, '../vistas')));


//puerto dinamico
app.set('puerto', process.env.PORT || 3000);
  app.listen(app.get('puerto'), function () {
      console.log('Example app listening on port'+ app.get('puerto'));
    });
//conexion con web sockets unicasting
 io.on('connection', function (socket){
io.sockets.emit('hola', 'holaQueTal');
})















//Ejemlo mongo db
/*
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
     
      const db = client.db(dbName);
      insertDocuments(db, function() {
        client.close();
      });
    
    });

    const insertDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection('documents');
      // Insert some documents
      collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
      ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
      });
    }*/
  