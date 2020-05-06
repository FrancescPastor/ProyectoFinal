var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const https = require('https');
const session = require ('express-session') ;
const path = require("path");
const fs = require("fs");
app.set('trust proxy', 1) 
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var port = 8888;
var io = require('socket.io').listen(app.listen(port));
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'webClass';

/**
 * Usamos el sesion de express
 */
app.use (session({
  secret: "fd34s@!@dfa453f3DF#$D&W", 
  resave: false, 
  saveUninitialized: true, 
  cookie: {path: '/',httpOnly: true, secure: true, maxAge: null }
}))
/**
 * hacer esl server https
 * */
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log('Listening...')
})

var auth = function(req, res) { 


  if (req.session.user == "pau@gmail.com" ){
  console.log(req.session.user);
    return 1();
  }
  else{
   console.log(req.session.user);
    console.log("no puedes entrar");
    return res.sendStatus(401)
   }
};
/**
 * Aqui ponemos la ruta
 */
app.get("/alumno", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));
  console.log(req.session.user);
  auth(req, res,  function(){});
  


})
app.get("/profesor", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));

})
/**
 * esta es la ruta de registro que valida si el usuario esta en la bdd y si esta deja entrar
 */
app.get("/registro", (req, res) => {
  io.on('connection', function (socket) {
    socket.on('dataUser', function (data) {
      MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        /**
         * llamamos a la funcion que comprueba el login
         */
        checkLogin(db, err, function () { });
        client.close();
       
      });
      var checkLogin = function (db, err, callback) {
        db.collection('loginUsers').find({ email: data[0], password: data[1] }).toArray(function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            socket.emit('userType', result[0].type);
            req.session.user = result[0].email;
          console.log("registro"+req.session.user);
          }
        });
        assert.equal(err, null);
        callback();
      }
      
  
    });
  })
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.join(__dirname, '../cliente', 'registro.html'));

})
 

/**
 * Esto es para hacer que vaya el vuejs y se ha de poner debajo de las rutas !!siempre!!
 */
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





