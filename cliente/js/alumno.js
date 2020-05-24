let tokenProfe = "";
var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};
var oneTime = 0;
var oneTimeCamara = 0;

Vue.component('empezarExamenAlumno', {
    template: /*html*/ `
<div>

<form class="col-12 mt-2">
  <fieldset class="mb-5">
    <h1 class="text-center">Listado de Exámenes Pendientes</h1>
    <div  v-show="lista" class="form-group row">
      <div class="col-lg-4">
           <ul>
              <li v-if="examen.estado == 0" class="list-group-item list-group-item-secondary text-dark" disabled v-bind:id="examen.nombreExam" v-for="examen in listaExamenesTotal" v-text="examen.nombreExam" ></li>
              <li v-if="examen.estado == 1" class="list-group-item list-group-item-success text-dark" disabled v-bind:id="examen.nombreExam" v-for="examen in listaExamenesTotal" v-text="examen.nombreExam" ></li> 
              <li v-if="examen.estado == 2" class="parpadea text list-group-item list-group-item-action list-group-item-danger text-light" v-bind:id="examen.nombreExam" v-for="examen in listaExamenesTotal" v-text="'Realizar el Exámen: ' + examen.nombreExam " @click="mostrarExamenCompletoAlumno"></li> 
          </ul> 
      </div>
    </div> 
  </fieldset>
</form>

<form  v-show="!lista" class="col-12 mt-2">
  <fieldset v-show="!mostrar" class="mb-5">   
      <div class="form-group row">  
          <div  v-for=" pregunta in listaPreguntasDeLosExamenes" class="col-lg-12">    
              <p id="preguntas" for="nombre" v-text="pregunta.preguntas" ><b></b></p>   
              <textarea  v-on:keydown="keymonitor" v-model="pregunta.respuestas" placeholder="Escriba aquí su respuesta..." rows="3"  column="5" class="form-control form-control-lg col-md-12" ></textarea>
          </div>
          <div class="col-lg-12"> 
              <button v-show="!mostrar" class="btn btn-info btn-block" @click="guardarExamenAlumno">Finalizar Exámen</button>
          </div>
      </div> 
 
   <div class="container">
 
 <ul>

   <li class ="reloj"><span class="tiempo" id="hours"><h1>{{horas}}</h1></span>Horas</li>
   <li class ="reloj"><span class="tiempo" id="minutes"><h1>{{minutos}}</h1></span>Minutos</li>
   <li class ="reloj"><span class="tiempo" id="seconds"><h1>{{segundos}}</h1></span>Segundos</li>
 </ul>
 </div>
 </fieldset>
</form>
<form v-show="finTiempo" class="col-12 mt-2">
  <fieldset  class="mb-5">  
    <div class="form-group row">  
        <p>El tiempo ha finalizado</p>
        <div class="col-lg-4"> 
              <button class="btn btn-info btn-block" @click="guardarExamenAlumno">Guardar Exámen</button>
          </div>
    </div>
    
  </fieldset>
</form>              
</div> 

  `,

    data() {


        return {
            nombreExamen: "",
            listaPreguntasDeLosExamenes: [],
            mostrar: true,
            respuestasAlumno: [],
            claseAlumno: "",
            nombreAlumno: "",
            apellidoAlumno: "",
            listaExamenesTotal: [],
            listaExamenesRealizados: [],
            lista: true,
            preguntas: false,
            camara: false,
            pantalla: false,
            horas: 0,
            minutos:0,
            segundos:0,
            finTiempo: false


        }
    },
    methods: {
        keymonitor: function(event) {
            //PARTE PAU DESCOMENTA SI QUIERS Q VAYA
            /*   this.name=event.key;
               console.log(this.name);
               let socket = io.connect('http://localhost:8888');
               socket.emit ('caracter', this.name);*/
        },
        mostrarExamenCompletoAlumno: function() {
            this.permitirConexiones();
            var preguntasExamen = [];
            var nombreE = "";
            let socket = io.connect('http://localhost:8888');
            let h = 0;
            let m= 0;
            let s = 0;
            socket.on('examenCompletoAlumnos', function(examenesCompletoAlumno) {
                nombreE = examenesCompletoAlumno[0].nombreExamen;
                preguntasExamen = examenesCompletoAlumno[0].preguntas;
                console.log(examenesCompletoAlumno);

            })
            socket.on('temps', function(temps) {
                
                console.log(temps);
                h = temps[0].hora;
                m = temps[0].minuto;
                s = temps[0].segundos
            })
            
            setTimeout(() => {
                this.nombreExamen = nombreE;
                this.listaPreguntasDeLosExamenes = preguntasExamen;
                this.mostrar = false;
                this.lista = false;
                this.horas = h;
                this.minutos= m;
                this.segundos = s;
                this.contador();
            }, 2000);



        },
        salvarRespuestasExamen: function() {
            localStorage.setItem("RespuestasExamen", JSON.stringify(this.listaPreguntasDeLosExamenes))
        },
        guardarExamenAlumno: function() {
            var examen = [];
            var respuestasExamen = JSON.parse(localStorage.getItem("RespuestasExamen"));
            var emailAlumno = localStorage.getItem("emailAlumn");

            examen.push({ emailAlumno: emailAlumno, nombreExamen: this.nombreExamen, respuestasAlumno: respuestasExamen })

            let socket = io.connect('http://localhost:8888');
            this.lista = true;
            this.finTiempo = false;
            socket.emit('respuestasAlumnoDelExamen', examen)
        },
        recuperarDatosAlumno: function() {
           
            let emailAlumno = localStorage.getItem("emailAlumn");
            let nombre = "";
            let apellido = "";
            let clase = "";
            let socket = io.connect('http://localhost:8888');

            socket.emit('datosAlumno', emailAlumno);

            socket.on('datosDelAlumno', function(datosDelAlumno) {

                nombre = datosDelAlumno[0].nombreAlumno;
                apellido = datosDelAlumno[0].apellidos;
                clase = datosDelAlumno[0].clase;

            });

            setTimeout(() => {
                this.claseAlumno = clase;
                this.nombreAlumno = nombre;
                this.apellidoAlumno = apellido;
                this.listadoExamenesPorClase(clase);
                this.listaExamenRealizadosXAlumno(emailAlumno);
            }, 900);

          

        },
        listadoExamenesPorClase: function(clase) {
            let listaExamens = []

            let socket = io.connect('http://localhost:8888');

            socket.emit('clasAlumno', clase);

            socket.on('listadoExamenes', function(listadoExamenes) {
                let estado = 0;
                for (i = 0; i < listadoExamenes.length; i++) {

                    listaExamens.push({ nombreExam: listadoExamenes[i], estado: estado });

                }

            });

            setTimeout(() => {
                this.listaExamenesTotal = listaExamens;
            }, 900);


        },
        contador:function(){

            this.segundos=this.segundos-1;
        
            if(this.segundos<0){
                this.segundos=59;
                this.minutos=this.minutos-1;
            }
        
            
            if(this.minutos<0){
        
                this.minutos=59;
                this.horas=this.horas-1;
            }
            if(this.horas<0){
            
            }
            else{
              setTimeout(this.contador,1000);
            }
            if (this.horas == 00 && this.minutos == 00 && this.segundos == 00) {
                this.segundos = 00;
                this.minutos = 00;
                this.horas = 00;
                this.finTiempo = true;
                this.mostrar = true;
            }
        },
        listaExamenRealizadosXAlumno: function(emailAlumn) {

            let examenesRealizadosXAlumno = []
            let socket = io.connect('http://localhost:8888');

            socket.emit('exmPendiEmailDelAlumno', emailAlumn);

            socket.on('listadoExRealizadosXAlumno', function(listadoExamenesRealizados) {

                for (i = 0; i < listadoExamenesRealizados.length; i++) {

                    //   examenesRealizadosXAlumno.push({ nombreRealizadoExamen: listadoExamenesRealizados[i] });
                    examenesRealizadosXAlumno = listadoExamenesRealizados;
                }
            });

            setTimeout(() => {
                this.listaExamenesRealizados = examenesRealizadosXAlumno
            }, 900);

        },
        estadoExamen: function() {
            var nombreE = "";
            let socket = io.connect('http://localhost:8888');

            socket.on('examenCompletoAlumnos', function(examenesCompletoAlumno) {

                if (examenesCompletoAlumno.length != 0) {

                    nombreE = examenesCompletoAlumno[0].nombreExamen;
                }

            })

            setTimeout(() => {
                for (i = 0; i < this.listaExamenesTotal.length; i++) {
                   
                    if (this.listaExamenesRealizados.includes(this.listaExamenesTotal[i].nombreExam)) {

                        this.listaExamenesTotal[i].estado = 1;
                    }
                    if (nombreE == this.listaExamenesTotal[i].nombreExam) {
                     
                        this.listaExamenesTotal[i].estado = 2;
                    }
                    if (nombreE == this.listaExamenesTotal[i].nombreExam&&this.listaExamenesRealizados.includes(this.listaExamenesTotal[i].nombreExam)) {
                        this.listaExamenesTotal[i].estado = 1;
                    }
                }
            }, 2000);


        },
        /**pantalla */
        openStreaming: function() {
            navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
                .then(stream => {

                    const p = new SimplePeer({ initiator: location.hash === "#/empezarExamenAlumno", trickle: false, stream });
                    console.log("entrado");
                    p.on('signal', token => {
                        informacionStreamAlumno = [];

                        let socket = io.connect('http://localhost:8888');
                        informacionStreamAlumno.push(localStorage.getItem('emailAlumn'));
                        informacionStreamAlumno.push(JSON.stringify(token));
                        console.log(informacionStreamAlumno);
                        socket.emit('tokenAlumnoStreaming', informacionStreamAlumno);
                        setInterval(() => {
                           
                            let socket = io.connect('http://localhost:8888');
                            socket.on('tokenProfeToAlumnoScreen', function(data) {
                                console.log(data);
                                if (data!=0) {
                                let emailComparar = JSON.parse(data[0]);

                                if (emailComparar == localStorage.getItem('emailAlumn')) {
                                    if (oneTime== 0) {
                                             p.signal(data[1]);
                                    oneTime= 1;
                                }
                                }}
                            })
                        }, 900);
                        
                   
                         
                       
                    });
                })
                .catch(err => console.log(err));
        },
        /**camara */
        openStream: function() {
            navigator.mediaDevices.getUserMedia({ audio: false, video: true })
                .then(stream => {

                    const p = new SimplePeer({ initiator: location.hash === "#/empezarExamenAlumno", trickle: false, stream });
                    console.log("entrado");
                    p.on('signal', token => {
                        informacionAlumno = [];

                        let socket = io.connect('http://localhost:8888');
                        informacionAlumno.push(localStorage.getItem('emailAlumn'));
                        informacionAlumno.push(JSON.stringify(token));
                        socket.emit('tokenAlumno', informacionAlumno);

                        setInterval(() => {

                            let socket = io.connect('http://localhost:8888');
                            socket.on('tokenConexion', function(data) {
                                if (data!=0) {
                                let emailComparar = JSON.parse(data[0]);

                                if (emailComparar == localStorage.getItem('emailAlumn')) {
                                    if (oneTimeCamara == 0) {
                                    p.signal(data[1]);
                                    oneTimeCamara=1;
                                    }
                                }
                            }
                            })
                        }, 900);
                       

                    });



                })
                .catch(err => console.log(err));
        },
permitirConexiones : function () {
    this.openStreaming();
    this.openStream();
}
    },

    created: function() {
        this.salvarRespuestasExamen();
        setInterval(this.salvarRespuestasExamen, 90);
       
        this.recuperarDatosAlumno();
        this.estadoExamen();
        setInterval(this.estadoExamen, 2000);
        setInterval(this.recuperarDatosAlumno, 60000);



    }
});

const error = {
    data: function() {
        return {
            url: window.location.hash
        };
    },
    template: `
      <div>
        <p>URL no encaminada : {{url}} </p>
      </div>
      `
};
const empezarExamenAlumno = {
    template: `
      <div>
      <empezarExamenAlumno></empezarExamenAlumno>
      </div>
    
      `
};
const rutes = {

    '#/empezarExamenAlumno': empezarExamenAlumno,



};
var app = new Vue({

    el: '#app',
    data: {
        rutaActual: window.location.hash,
        rutes: rutes

    },
    methods: {
        navegar: function($event) {
            this.rutaActual = $event.target.hash;
        }
    },
    computed: {
        vistaActual: function() {
            return this.rutes[this.rutaActual] || error;
        }
    },
    template: /*html*/ `
    <div>
        <nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand">Alumno</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span id="iconoMenu" class="fas fa-bars"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#/empezarExamenAlumno" v-on:click="navegar">Exámenes Pendientes</a>
      </li>
    </ul>
  </div>
</nav>
<div v-bind:is="vistaActual"> 
</div>
    </div>
    `
});