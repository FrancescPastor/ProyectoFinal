var express = require('express');
var app = express();
const path = require ("path");
const fs = require ("fs");

var bodyParser = require("body-parser");

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
