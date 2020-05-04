var express = require('express');
var app = express();
const https = require('https');

const path = require("path");
const fs = require("fs");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var port = 8888;
var io = require('socket.io').listen(app.listen(port));
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webClass';

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log('Listening...')
})

//Aqui ponemos la ruta
app.get("/alumno", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));

})
app.get("/profesor", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));

})

app.get("/registro", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'registro.html'));

})

//Esto es para hacer que vaya el vuejs y se ha de poner debajo de las rutas !!siempre!!
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, '../cliente')));

/*
//puerto dinamico esto es para hacerlo sin https 
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Esuchando por el puerto: ' + app.get('puerto'));
});*/
//conexion con web sockets unicasting
io.on('connection', function (socket) {
  socket.on('dataUser', function (data) {
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      //llamamos a la funcion que comprueba el login
      checkLogin(db, err, function () { });
      client.close();

    });

    var checkLogin = function (db, err, callback) {
      db.collection('loginUsers').find({ email: data[0], password: data[1] }).toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          socket.emit('userType', result[0].type);

        }
      });
      assert.equal(err, null);
      callback();
    }



  });
})








//Insert en la base de datos
/*
  var insertRegister = function (db, err, callback){
    db.collection ('loginUsers').insertOne({
      "email" : data[0],
      "password": data[1],
      "type": "administrador"
    });
    assert.equal(err,null);
    console.log("correct");
    callback();
  }
*/





