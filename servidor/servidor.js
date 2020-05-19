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
            if (err) throw err;
            if (result.length > 0) {

                res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));
            } else {

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

                res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));
            } else {

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
    res.setHeader("Content-type", "text/html");
    res.sendFile(path.join(__dirname, '../cliente', 'alumno.html'));
    // authAlumno(req, res,  function(){});

})
app.get("/profesor", (req, res) => {

        io.on('connection', function(socket) {

            socket.on('registroAlumno', function(data) {
              
            });
        })
        res.setHeader("Content-type", "text/html");
        res.sendFile(path.join(__dirname, '../cliente', 'profesor.html'));
        //authProfesor(req, res,  function(){});

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
app.get("/registro", (req, res) => {
    io.on('connection', function(socket) {
        socket.on('dataUser', function(data) {
            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                /**
                 * llamamos a la funcion que comprueba el login
                 */
                insertarAlumno(db, err, function() {});
                insertarRegistro(db, err, function() {});
                client.close();

            });
            var insertarAlumno = function(db, err, callback) {
                db.collection('RegistroUsuarios').insertOne({
                    "nombre": data[0],
                    "apellidos": data[1],
                    "email": data[2],
                    "password": data[3],
                    "ciudad": data[4],
                    "direccion": data[5],
                    "cp": data[6],
                    "telefono": data[7],
                    "tipo": data[8],
                    "fechaNacimiento": data[9],
                    "clase": data[10],
                    "asignatura": data[11],


                });
                assert.equal(err, null);
                console.log("correct");
                callback();
            }
            var insertarRegistro = function(db, err, callback) {
                db.collection('loginUsers').insertOne({
                    "email": data[2],
                    "password": data[3],
                    "type": data[8]
                });
                assert.equal(err, null);
                console.log("correct");
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

// Subir variables globales arriba 17/05/2020

/**
 * Guadar el examen realizado por el profesor
 * **/
io.on('connection', function(socket) {

    socket.on('examen', function(textExamen) {
        var listaPreguntasExamen = [];
        nombreExamen = textExamen[0].nombreExamen;
        nombreMateria = textExamen[0].nombreMateria;
        nombreAula = textExamen[0].nombreAula;
        listaPreguntasExamen = textExamen[0].preguntas;


        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            insertarExamen(db, err, function() {});
            client.close();
        });

        var insertarExamen = function(db, err, callback) {

            for (i = 0; i < listaPreguntasExamen.length; i++) {
                db.collection('examenes').insert({
                    "nombreExamen": nombreExamen,
                    "nombreMateria": nombreMateria,
                    "nombreAula": nombreAula,
                    "pregunta": listaPreguntasExamen[i].elementos,
                });


            }
            assert.equal(err, null);
            console.log("correct");
            callback();
        }
    });
})

/**
 * Mostrar la lista de examenes en el combo de realizar examen
 * **/
io.on('connection', function(socket) {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);

        mostrarExamenes(db, err, function() {});
        client.close();
    });
    var mostrarExamenes = function(db, err, callback) {
        var nombreDelExamen = [];
        db.collection('examenes').find({}).toArray(function(err, result) {

            for (i = 0; i < result.length; i++) {
                let nom = result[i].nombreExamen;

                if (!nombreDelExamen.includes(nom)) {
                    nombreDelExamen.push(result[i].nombreExamen)
                }

            }

            socket.emit('mostrarExamen', nombreDelExamen);
        })


    }
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

/**
 * Enviar el examen completo seleccionado al alumno 
 **/
var examenCompletoAlumno = [];
var preguntasYnombre = [];
io.on('connection', function(socket) {

    socket.on('enviarExamenes', function(nombreExamen) {

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
                preguntasYnombre.push({ nombreExamen: nombreExamen, preguntas: examenCompletoAlumno, respuestas: "" })

            })
        }

    })
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

            recibirRespuestaExamen(db, err, function() {});
            client.close();
        });

        var recibirRespuestaExamen = function(db, err, callback) {
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
    })
})

/** 
 * Recoger los nombres de los alumenos que pertenecen al examen demandado
 * */
io.on('connection', function(socket) {

    socket.on('nombreAlumnosDelExamenACorregir', function(nombreAlumnosDelExamenACorregir) {

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);

            recorgerNombresAlumnosExamen(db, err, function() {});
            client.close();
        });

        var recorgerNombresAlumnosExamen = function(db, err, callback) {
            let nombreAlumnosExamenReal = [];

            db.collection('examenesRealizados').find({}).toArray(function(err, result) {

                for (i = 0; i < result.length; i++) {

                    if (result[i].nombreExamen == nombreAlumnosDelExamenACorregir) {

                        if (!nombreAlumnosExamenReal.includes(result[i].emailAlumno)) {

                            nombreAlumnosExamenReal.push(result[i].emailAlumno)
                        }

                    }
                }
                socket.emit('nombreAlumnosExamenReal', nombreAlumnosExamenReal);

            })
        }
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

            recuperarExamenAlumnoACorregir(db, err, function() {});
            client.close();
        });

        var recuperarExamenAlumnoACorregir = function(db, err, callback) {
            let examenPedienteCorreccion = [];
            let emailAlumno = examenAlumnoACorregir[0].gmailAlumno;
            let nombreExamen = examenAlumnoACorregir[0].nombreExamenPendiente;

            db.collection('examenesRealizados').find({}).toArray(function(err, result) {

                for (i = 0; i < result.length; i++) {

                    if (result[i].emailAlumno == emailAlumno && result[i].nombreExamen == nombreExamen) {

                        examenPedienteCorreccion.push({ pregunta: result[i].preguntaExamen, respuesta: result[i].respuestasExamen, nota: "" })

                    }
                }

                socket.emit('examenACorregir', examenPedienteCorreccion);

            })
        }
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

            guardarExamenCorregido(db, err, function() {});
            client.close();
        });

        var guardarExamenCorregido = function(db, err, callback) {
            let notas = "";
            let notasExamen = examenCorregido[0].listasNotasExamenes;
            let nombreAlumno = examenCorregido[0].nombreAlumnoDelExamen;
            let nombreExamen = examenCorregido[0].nombreDelExamen;
            let notaFinalExamen = examenCorregido[0].notaFinalExamen;
            let x = 0;
            for (i = 0; i < notasExamen.length; i++) {
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
    })
})