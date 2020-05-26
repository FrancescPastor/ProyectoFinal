var express = require('express'); 
var app = express();
const https = require('https');
require('https').globalAgent.options.rejectUnauthorized = false;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
const fs = require("fs");
app.set('trust proxy', 1)
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var port = 8888;
var privateKey = fs.readFileSync('./server.key').toString();
var certificate = fs.readFileSync('./server.cert').toString();
//var ca = fs.readFileSync('YOUR SSL CA').toString();

var io = require('socket.io').listen(app.listen(port, { key: privateKey, cert: certificate }));
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'webClass';

var enviar = 0;


class Persona
{
constructor(nombre, apellidos, email, password, ciudad, direccion, codigoPostal, telefono, fechaNacimiento){
    this.nombre = nombre;
    this.apellidos =apellidos;
    this.email = email;
    this.password = password;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.codigoPostal = codigoPostal;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;

}

}

class Alumno extends Persona {
  constructor(nombre, apellidos, email, password, ciudad, direccion, codigoPostal, telefono, fechaNacimiento, clase, asignatura) {
    super(nombre, apellidos, email, password, ciudad, direccion, codigoPostal, telefono, fechaNacimiento);
     this.clase = clase;
     this.asignatura = asignatura;
    }
    recibirRespuestaExamen (db, err, callback, respuestasAlumno) {
        var email = respuestasAlumno[0].emailAlumno;
        var nombreExamRealizado = respuestasAlumno[0].nombreExamen;
        var respuestaExamRealizado = respuestasAlumno[0].respuestasAlumno;

        for (i = 0; i < respuestaExamRealizado.length; i++) {
            db.collection('examenesRealizados').insert({
                "emailAlumno": email,
                "nombreExamen": nombreExamRealizado,
                "preguntaExamen": respuestaExamRealizado[i].preguntas,
                "respuestasExamen": respuestaExamRealizado[i].respuestas
            });
        }
    }
    recuperarDatosAlumno (db, err, callback, datosAlumno, socket) {
        let datosAlumnos = [];

        db.collection('RegistroUsuarios').find({ email: datosAlumno }).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                let clase = result[i].clase;
                let nombre = result[i].nombre;
                let apellidos = result[i].apellidos;

                datosAlumnos.push({ clase: clase, nombreAlumno: nombre, apellidos: apellidos })
            }

            socket.emit("datosDelAlumno", datosAlumnos);
        });


        assert.equal(err, null);
        callback();
    }
    recuperarListaExamenesClase (db, err, callback, claseAlumno, socket) {
        let listaExamenesXClase = [];

        db.collection('examenes').find({ nombreAula: claseAlumno }).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                let nombreExamen = result[i].nombreExamen;

                if (!listaExamenesXClase.includes(nombreExamen)) {
                    listaExamenesXClase.push(nombreExamen)
                }
            }

            socket.emit("listadoExamenes", listaExamenesXClase);
        });

        assert.equal(err, null);
        callback();
    }
  }
  var alumno = new Alumno ();
  class Profesor extends Persona {
    constructor(nombre, apellidos, email, password, ciudad, direccion, codigoPostal, telefono, fechaNacimiento) {
      super(nombre, apellidos, email, password, ciudad, direccion, codigoPostal, telefono, fechaNacimiento);

      }
      insertarAlumno  (db, err, callback, data) {


        db.collection('RegistroUsuarios').insertOne({
            "nombre": data[0][0],
            "apellidos": data[0][1],
            "email": data[0][2],
            "password": data[0][3],
            "ciudad": data[0][4],
            "direccion": data[0][5],
            "cp": data[0][6],
            "telefono": data[0][7],
            "tipo": data[0][8],
            "fechaNacimiento": data[0][9],
            "clase": data[0][10],
            "asignatura": data[0][11],
        });


        assert.equal(err, null);
        console.log("correct");
        callback();
    }
        insertarRegistro (db, err, callback, data) {
            db.collection('loginUsers').insertOne({
                "email": data[0][2],
                "password": data[0][3],
                "type": data[0][8]
            });
            assert.equal(err, null);
            console.log("correct");
            callback();
     }
    comprobarNombre (db, err, callback, comprobarNombreExamen, socket) {
        let existe = 0;

        db.collection('examenes').find({ nombreExamen: comprobarNombreExamen }).toArray(function(err, result) {

            if (result.length > 0) {
                socket.emit('comprobacionNombre', 'existe');

            } else if (!result.length > 0) {
                existe = 0; 
                socket.emit('comprobacionNombre', 'noexiste');
            }
        })

        assert.equal(err, null);
        callback();

    }
     insertarExamen (db, err, callback, textExamen) {
        var listaPreguntasExamen = [];
        var nombreExamen = textExamen[0].nombreExamen;
        var nombreMateria = textExamen[0].nombreMateria;
        var nombreAula = textExamen[0].nombreAula;
        var listaPreguntasExamen = textExamen[0].preguntas;

        for (i = 0; i < listaPreguntasExamen.length; i++) {
            db.collection('examenes').insertOne({
                "nombreExamen": nombreExamen,
                "nombreMateria": nombreMateria,
                "nombreAula": nombreAula,
                "pregunta": listaPreguntasExamen[i].elementos,
            });
        }
        assert.equal(err, null);
        callback();
    }
    mostrarExamenes (db, err, callback, socket) {
        var nombreDelExamen = [];
        db.collection('examenes').find({}).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {
                let nom = result[i].nombreExamen;

                if (!nombreDelExamen.includes(nom)) {
                    nombreDelExamen.push(result[i].nombreExamen)
                }

            }

            socket.emit('mostrarExamen', nombreDelExamen);
        })


    }
    mostrarExamenesRealizados(db, err, callback, socket) {
        var nombreDelExamenRealizados = [];
        db.collection('examenesRealizados').find({}).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {
                let nom = result[i].nombreExamen;

                if (!nombreDelExamenRealizados.includes(nom)) {
                    nombreDelExamenRealizados.push(result[i].nombreExamen)
                }
            }
            socket.emit('mostrarExamenRealizados', nombreDelExamenRealizados);
        })


    }
    recorgerNombresAlumnosExamen (db, err, callback, nombreAlumnosDelExamenACorregir, socket) {
        let nombreAlumnosExamenReal = [];

        db.collection('examenesRealizados').find({}).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                if (result[i].nombreExamen == nombreAlumnosDelExamenACorregir) {

                    if (!nombreAlumnosExamenReal.includes(result[i].emailAlumno)) {

                        nombreAlumnosExamenReal.push(result[i].emailAlumno)
                    }

                }
            }
            socket.emit('nombreAlumnosExamenReal', nombreAlumnosExamenReal);

        })
    }
    recuperarExamenAlumnoACorregir (db, err, callback, socket, examenAlumnoACorregir) {
        let examenPedienteCorreccion = [];
        let emailAlumno = examenAlumnoACorregir[0].gmailAlumno;
        let nombreExamen = examenAlumnoACorregir[0].nombreExamenPendiente;

        db.collection('examenesRealizados').find({}).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                if (result[i].emailAlumno == emailAlumno && result[i].nombreExamen == nombreExamen) {

                    examenPedienteCorreccion.push({ pregunta: result[i].preguntaExamen, respuesta: result[i].respuestasExamen, nota: "" })

                }
            }

            socket.emit('examenACorregir', examenPedienteCorreccion);

        })
    }
    guardarExamenCorregido (db, err, callback, examenCorregido) {
        let nombreAlumno = examenCorregido[0].nombreAlumnoDelExamen;
        let nombreExamen = examenCorregido[0].nombreDelExamen;
        let notas = "";
        let notasExamen = examenCorregido[0].listasNotasExamenes;

        let notaFinalExamen = examenCorregido[0].notaFinalExamen;
        let x = 0;
        for (let i = 0; i < notasExamen.length; i++) {
            if (notasExamen[i].nota != "") {
                x++;
                notas = notas + "Pregunta" + "." + x + " " + "Puntuacion--> " + notasExamen[i].nota + " // ";
            }

        }
        db.collection('examenesNotas').insert({
            "notas": notas,
            "nombreAlumno": nombreAlumno,
            "nombreExamen": nombreExamen,
            "notaFinalExamen": notaFinalExamen

        });

        assert.equal(err, null);
        console.log("correct");
        callback();
    }
   borrarExamenCorregido (db, err, callback, examenCorregido) {
        let nombreAlumno = examenCorregido[0].nombreAlumnoDelExamen;
        let nombreExamen = examenCorregido[0].nombreDelExamen;
        db.collection('examenesRealizados').deleteMany({ emailAlumno: nombreAlumno, nombreExamen: nombreExamen })
        assert.equal(err, null);
        console.log("correct");
        callback();
    }
    recuperarListaAlumnoXClase (db, err, callback, claseAlumnos, socket) {
        let listaAlumnosXClase = [];

        db.collection('RegistroUsuarios').find({ clase: claseAlumnos }).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                let nom = result[i].nombre;
                let apellidos = result[i].apellidos;
                let email = result[i].email;
                let ciudad = result[i].ciudad;
                let direccion = result[i].direccion;
                let cp = result[i].cp;
                let fechaNac = result[i].fechaNacimiento;
                let telefono = result[i].telefono;

                listaAlumnosXClase.push({ nombre: nom, apellidos: apellidos, email: email, ciudad: ciudad, direccion: direccion, cp: cp, fechaNacimiento: fechaNac, telefono: telefono })

            }

            socket.emit("alumnoInformacion", listaAlumnosXClase);
        });


        assert.equal(err, null);
        callback();
    }
    recuperarListaNotasAlumno (db, err, callback, idEmailAlumno, socket) {
        let listaNotasAlumnos = [];

        db.collection('examenesNotas').find({ nombreAlumno: idEmailAlumno }).toArray(function(err, result) {

            for (let i = 0; i < result.length; i++) {

                let nombreExamen = result[i].nombreExamen;
                let nombreAlumno = result[i].nombreAlumno;
                let notaFinal = result[i].notaFinalExamen;
                let notas = result[i].notas;


                listaNotasAlumnos.push({ nombreExamen: nombreExamen, nombreAlumno: nombreAlumno, notaFinal: notaFinal, notas: notas })


            }

            socket.emit("listaNotasAlumnos", listaNotasAlumnos);
        });


        assert.equal(err, null);
        callback();
    }
    listaExamenesRealizadosXAlumno (db, err, callback, emailAlumno, socket) {
        let listaExRealizadosXAlumno = [];

        db.collection('examenesRealizados').find({ emailAlumno: emailAlumno }).toArray(function(err, result) {


            for (let i = 0; i < result.length; i++) {

                let nombreExamen = result[i].nombreExamen;

                if (!listaExRealizadosXAlumno.includes(nombreExamen)) {
                    listaExRealizadosXAlumno.push(nombreExamen)
                }
            }

            socket.emit("listadoExRealizadosXAlumno", listaExRealizadosXAlumno);
        });


        assert.equal(err, null);
        callback();
    }
    }
    var profesor = new Profesor ();
/**
 * Usamos el sesion de express
 */
app.use(cookieParser('fd34s@!@dfa453f3DF#$D&W'));
app.use(session({
        secret: "fd34s@!@dfa453f3DF#$D&W",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
    /**
     * hacer esl server https
     * */
https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, app).listen(3000, "0.0.0.0", () => {
    console.log('Listening...')
})

var authAlumno = function(req, res) {
    MongoClient.connect(url, function(err, client, req, res) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        /**
         * llamamos a la funcion que comprueba el login
         */
        sessionControl(db, err, function() {});
        client.close();
    });
    var sessionControl = function(db, err, callback) {
        db.collection('loginUsers').find({ email: req.session.user, type: "alumno" }).toArray(function(err, result) {
        console.log(req.session.user);
            if (err) throw err;
            if (result.length > 0) {
                
                res.setHeader("Content-type", "text/html");
                res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));
            } else {
               
                res.setHeader("Content-type", "text/html");
                res.sendFile(path.join(__dirname, '../cliente', 'registro.html'));
            }
        });
        assert.equal(err, null);
        callback();
    }
};
var authProfesor = function(req, res) {
    MongoClient.connect(url, function(err, client, req, res) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        /**
         * llamamos a la funcion que comprueba el login
         */
        sessionControlP(db, err, function() {});
        client.close();
    });
    var sessionControlP = function(db, err, callback) {
        db.collection('loginUsers').find({ email: req.session.user, type: "profesor" }).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.setHeader("Content-Type", "text/html; charset=utf-8");  
                res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));
            } else {
                res.setHeader("Content-Type", "text/html; charset=utf-8");  
                res.sendFile(path.join(__dirname, '../cliente', 'registro.html'));
            }
        });
        assert.equal(err, null);
        callback();
    }
};
var authAdmin = function(req, res) {
    MongoClient.connect(url, function(err, client, req, res) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        /**
         * llamamos a la funcion que comprueba el login
         */
        sessionControlP(db, err, function() {});
        client.close();
    });
    var sessionControlP = function(db, err, callback) {
        db.collection('loginUsers').find({ email: req.session.user, type: "admin" }).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.setHeader("Content-Type", "text/html; charset=utf-8");  
                res.sendFile(path.join(__dirname, '../cliente', 'administrador.html'));
            } else {
                res.setHeader("Content-Type", "text/html; charset=utf-8");  
                res.sendFile(path.join(__dirname, '../cliente', 'registro.html'));
            }
        });
        assert.equal(err, null);
        callback();
    }
};
/**
 * Aqui ponemos la ruta
 */
app.get("/alumno", (req, res) => {
  
    res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));
    // authAlumno(req, res,  function(){});

})

app.get("/administrador", (req, res) => {
   // authAdmin(req, res,  function(){});
   res.sendFile(path.join(__dirname, '../cliente', 'administrador.html'));

})
app.get("/profesor", (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));

    //authProfesor(req, res,  function(){});
        io.on('connection', function(socket) {

            socket.on('registroAlumno', function(data) {

            });
        })

    
    })
    app.get("/registro", (req, res) => {
        io.on('connection', function (socket) {
            socket.on('dataUser', function (data) {
                console.log(data);
              MongoClient.connect(url, function (err, client) {
                assert.equal(null, err);
        
                const db = client.db(dbName);
        
                checkLogin(db, err, function () { });
                client.close();
               
              });
              var checkLogin = function (db, err, callback) {
                db.collection('loginUsers').find({ email: data[0], password: data[1] }).toArray(function (err, result) {
                  if (err) throw err;
                  if (result.length > 0) {
                    socket.emit('userType', result[0].type);
                    req.session.user = result[0].email;
                    req.session.save();
                    console.log(req.session.user);
                
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
     * esta es la ruta de registro que valida si el usuario esta en la bdd y si esta deja entrar
     */
var tokenAlumn = "";

var tokenProfe = "";
var arrayTokensAlumnos = [];
var idAlumnoServidor = 0;
var idAlumnoServidorS = 0;
var tokenProfesorAlumno = [];
var arrayTokensAlumnosStreaming = [];
var tokenProfesorAlumnoScreen = [];
io.on('connection', function(socket) {

    socket.on('tokenAlumno', function(data) {
        idAlumnoServidor++;
        tokenAlumn = data[1];
        if (data[1].length != 20) {

            arrayTokensAlumnos.push({ nombreAlumno: data[0], token: data[1], idAlumno: idAlumnoServidor });
        }

    });

    socket.emit('listaAlumnos', arrayTokensAlumnos);

    socket.on('tokenProfesor', function(data) {

        tokenAlumn = JSON.stringify(data[1]);
        if (tokenAlumn.length != 20) {
            tokenProfesorAlumno = data;

        }

    });
    socket.emit('tokenConexion', tokenProfesorAlumno);

    socket.on('tokenAlumnoStreaming', function(data) {
        idAlumnoServidorS++;

        if (data[1].length != 20) {
            arrayTokensAlumnosStreaming.push({ nombreAlumno: data[0], token: data[1], idAlumno: "s" + idAlumnoServidorS });
        }
    });

    socket.emit('tokenAlumnoToProfeScreen', arrayTokensAlumnosStreaming);

    socket.on('tokenProfesorScreen', function(data) {
        console.log("screen");
        tokenprofeS = JSON.stringify(data[1]);
        if (tokenprofeS.length != 20) {
            tokenProfesorAlumnoScreen = data;

        }

    });
    socket.emit('tokenProfeToAlumnoScreen', tokenProfesorAlumnoScreen);


});


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

// Subir variables globales arriba 17/05/2020



/**
 * Registro de los alumnos
 */
io.on('connection', function(socket) {
    socket.on('registroAlumno', function(data) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            /**
             * llamamos a la funcion que comprueba el login
             */
            profesor.insertarAlumno(db, err, function() {}, data);
            profesor.insertarRegistro(db, err, function() {}, data);
            client.close();

        });
        
       
    });
})
/**
 * Registro de los profesores
 */

io.on('connection', function(socket) {
    socket.on('registroProfesor', function(data) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            insertarProfesor(db, err, function() {});
            insertarRegistroProfesor(db, err, function() {});
            client.close();

        });
        function insertarProfesor (db,err,callback) {
    //    var insertarProfesor = function(db, err, callback) {


            db.collection('RegistroUsuarios').insertOne({
                "nombre": data[0][0],
                "apellidos": data[0][1],
                "email": data[0][2],
                "password": data[0][3],
                "ciudad": data[0][4],
                "direccion": data[0][5],
                "cp": data[0][6],
                "telefono": data[0][7],
                "tipo": data[0][8],
                "fechaNacimiento": data[0][9],
            });


            assert.equal(err, null);
            console.log("correct");
            callback();
        }
        var insertarRegistroProfesor = function(db, err, callback) {
            db.collection('loginUsers').insertOne({
                "email": data[0][2],
                "password": data[0][3],
                "type": data[0][8]
            });
            assert.equal(err, null);
            console.log("correct");
            callback();
        }

    });
})

/**
 * Guadar el examen realizado por el profesor
 * **/
io.on('connection', function(socket) {
    socket.on('comprobarNombreExamen', function(comprobarNombreExamen) {
        console.log(comprobarNombreExamen);
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            profesor.comprobarNombre(db, err, function() {}, comprobarNombreExamen, socket)
            client.close();
        });
    })
    socket.on('examen', function(textExamen) {
       
        
      

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            profesor.insertarExamen(db, err, function() {}, textExamen)
            client.close();
        });
      
    });
})
/**
 * Mostrar la lista de examenes en el combo de realizar examen
 * **/
io.on('connection', function(socket) {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);

        profesor.mostrarExamenes(db, err, function() {}, socket);
        client.close();
    });

})

/**
 * Mostrar el examen completo seleccionado al profesor
 **/
io.on('connection', function(socket) {

    socket.on('mostrarExamenCompleto', function(nombreExamen) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            mostrarExamenesCompleto(db, err, function() {});
            client.close();
        });

        var mostrarExamenesCompleto = function(db, err, callback) {
            var examenCompleto = [];
            db.collection('examenes').find({}).toArray(function(err, result) {

                for (i = 0; i < result.length; i++) {
                    if (result[i].nombreExamen == nombreExamen) {

                        examenCompleto.push({ preguntas: result[i].pregunta })
                    }
                }

                socket.emit('examenCompleto', examenCompleto);
            })
        }

    })
})
var temps = 0;

toHour = 0;
toMinute = 0;
toSecond = 0;
//cuenta atras
function countDown(){

    
	toSecond=toSecond-1;

	if(toSecond<0){
		toSecond=59;
		toMinute=toMinute-1;
	}

	
	if(toMinute<0){

		toMinute=59;
		toHour=toHour-1;
	}


	if(toHour<0){
	
	}
	else{
	  setTimeout(countDown,1000);
    }
    if (toHour == 0 && toMinute == 0 && toSecond== 0){
toHour = 0;
toSecond = 0;
toMinute = 0;
    }
}

/**
 * Enviar el examen completo seleccionado al alumno 
 **/
preguntasYnombre = [];
var examenCompletoAlumno = [];
var preguntasYnombre = [];
io.on('connection', function(socket) {

    socket.on('enviarExamenes', function(nombreExamenYtimmer) {
        nombreExamen = nombreExamenYtimmer[0].nombreExamen;
        duracionExamen = nombreExamenYtimmer[0].duracion;
        
        let x = duracionExamen.split(":",2);
        let hora = parseInt(x[0]);
        let minuto = parseInt(x[1])
        toHour = hora;
        toMinute = minuto;
        countDown();
        console.log(hora, minuto);

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            enviarExamenAlumno(db, err, function() {});
            client.close();
        });

        var enviarExamenAlumno = function(db, err, callback) {
           
            examenCompletoAlumno = [];
           preguntasYnombre = [];
            db.collection('examenes').find({}).toArray(function(err, result) {

                for (i = 0; i < result.length; i++) {
                    if (result[i].nombreExamen == nombreExamen) {
                        examenCompletoAlumno.push({ preguntas: result[i].pregunta })
                    }
                }
                preguntasYnombre.push({ nombreExamen: nombreExamen, preguntas: examenCompletoAlumno, respuestas: ""})

            })
        }

    })


    tiempo = [{hora: toHour, minuto: toMinute, segundos: toSecond}];
    socket.emit('temps', tiempo);
    socket.emit('examenCompletoAlumnos', preguntasYnombre);
})

/**
 * Recoger las respuestas del examen del alumno
 */
io.on('connection', function(socket) {

        socket.on('respuestasAlumnoDelExamen', function(respuestasAlumno) {

            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                alumno.recibirRespuestaExamen(db, err, function() {}, respuestasAlumno);
                client.close();
            });

            
        })
    })
    /**
     * Mostrar la lista de examenes Realizdos en el combo de realizar examen al profesor
     * **/
io.on('connection', function(socket) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.mostrarExamenesRealizados(db, err, function() {}, socket);
            client.close();
        });
      
    })
    /** 
     * Recoger los nombres de los alumenos que pertenecen al examen demandado
     * */
io.on('connection', function(socket) {

    socket.on('nombreAlumnosDelExamenACorregir', function(nombreAlumnosDelExamenACorregir) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.recorgerNombresAlumnosExamen(db, err, function() {}, nombreAlumnosDelExamenACorregir, socket);
            client.close();
        });

        
    })
})



// Añadir a la parte de Fran 18/05/2020

/**
 * Recuperar el examen del alumno para su corrección
 */
io.on('connection', function(socket) {

    socket.on('examenAlumnoACorregir', function(examenAlumnoACorregir) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.recuperarExamenAlumnoACorregir(db, err, function() {}, socket, examenAlumnoACorregir);
            client.close();
        });

         
    })
})

/**
 * Guardar examen corregido
 */
io.on('connection', function(socket) {

    socket.on('examenCorregido', function(examenCorregido) {
      
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.guardarExamenCorregido(db, err, function() {}, examenCorregido);
            profesor.borrarExamenCorregido(db, err, function() {}, examenCorregido);
            client.close();
        });

        
    })
})

/**
 * recuperar la lista de alumnos por clase
 */

io.on('connection', function(socket) {

    socket.on('listaAlumnos', function(claseAlumnos) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.recuperarListaAlumnoXClase(db, err, function() {}, claseAlumnos, socket);
            client.close();
        });

  
    })
})

/**
 * Recuperar las notas de un alumno
 */

io.on('connection', function(socket) {

    socket.on('idEmailAlumno', function(idEmailAlumno) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.recuperarListaNotasAlumno(db, err, function() {}, idEmailAlumno, socket);
            client.close();
        });

         

    })
})

//21/05/2020 pasar a fran

/**
 * Recoger los datos del alumno para la vista del propio alumno
 */
io.on('connection', function(socket) {

    socket.on('datosAlumno', function(datosAlumno) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            alumno.recuperarDatosAlumno(db, err, function() {}, datosAlumno, socket);
            client.close();
        });

      

    })
})


/**
 * Recuperar la lista de los examenes de un alumnos perteneciente a una clase determianda
 */

io.on('connection', function(socket) {

    socket.on('clasAlumno', function(claseAlumno) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            alumno.recuperarListaExamenesClase(db, err, function() {}, claseAlumno, socket);
            client.close();
        });

       

    })
})

/**
 * Recuperamos los examenes realizados filtrando por alumno
 */

io.on('connection', function(socket) {

    socket.on('exmPendiEmailDelAlumno', function(emailAlumno) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            profesor.listaExamenesRealizadosXAlumno(db, err, function() {}, emailAlumno, socket);
            client.close();
        });

      

    })
})
/**
 * logout 
 */

io.on('connection', function(socket) { 
    socket.on('logout', function(logout) { 
        req.session.destroy();
    })
})


















//PARTE PAU

/*
var arrayData = [];
var x = false;

io.on('connection', function (socket) {

    socket.on('caracter', function (data) {
      let caracter = data;
      console.log(caracter);
      date = new Date();
      arrayData.push(date);
      console.log(arrayData);
      if (caracter == "Control") {
        x = true;
        console.log(x)
      }
      if (x==true && caracter!="Control"){
        if(caracter=='v'){
        console.log("control+v detectat");
        }
        else{
          x=false;
          console.log(x);
        } 
      }
  
      
    });
  })*/



 