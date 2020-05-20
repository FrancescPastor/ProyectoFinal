
 
  let tokenProfe = "";
  var displayMediaOptions = {
    video: {
      cursor: "always"
    },
    audio: false
  };
  
 
  Vue.component('empezarExamenAlumno', {
    template: /*html*/ `
<div>

 <div class="col-12 mt-2 mb-5 ">
  <h1>Exámenes</h1>
  <div class="form-group row"> 
    <div class="col-lg-2"> 
      <button v-show="mostrar" id="botonGuardar" class="btn btn-primary" @click="mostrarExamenCompletoAlumno">Empezar Exámen</button>
    </div>
    
  </div>
 
   <div class="form-group row">  
      <div  v-for=" pregunta in listaPreguntasDeLosExamenes" class="col-lg-12">    
        <p id="preguntas" for="nombre" v-text="pregunta.preguntas" ><b></b></p>   
        <textarea v-model="pregunta.respuestas" placeholder="Escriba aquí su respuesta..." rows="3"  column="5" class="form-control form-control-lg col-md-12" ></textarea>
      </div>
    </div> 
     <div class="col-lg-12"> 
        <button v-show="!mostrar" class="btn btn-info btn-block" @click="guardarExamenAlumno">Finalizar Exámen</button>
       
    </div>
    <div>
     
          <button id="btn5">permitir profe ver pantalla</button>
          <button id="btn3">permitir profe ver camara</button>
      </div>
  </div>
</div> 

  `,

    data() {

        return {
            nombreExamen: "",
            listaPreguntasDeLosExamenes: [],
            mostrar: true,
            respuestasAlumno: [],

        }
    },
    methods: {
        mostrarExamenCompletoAlumno: function() {
            var preguntasExamen = [];
            var nombreE = "";
            let socket = io.connect('http://localhost:8888');

            socket.on('examenCompletoAlumnos', function(examenesCompletoAlumno) {
                nombreE = examenesCompletoAlumno[0].nombreExamen;
                preguntasExamen = examenesCompletoAlumno[0].preguntas;

            })


            setTimeout(() => {
                this.nombreExamen = nombreE;
                this.listaPreguntasDeLosExamenes = preguntasExamen;
                this.mostrar = false;
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

            socket.emit('respuestasAlumnoDelExamen', examen)
        },
        openStreaming: function () {
          navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
            .then(stream =>{ 
          
              const p = new SimplePeer ({initiator: location.hash === "#/empezarExamenAlumno", trickle: false, stream});
                console.log("entrado");
              p.on('signal', token =>{
               informacionStreamAlumno=[];
              
               let socket = io.connect('http://localhost:8888');
               informacionStreamAlumno.push(localStorage.getItem('emailAlumn'));
               informacionStreamAlumno.push(JSON.stringify(token));
               console.log(informacionStreamAlumno);
               socket.emit('tokenAlumnoStreaming',informacionStreamAlumno);
  
  
               $('#btn5').click(()=>{
                  console.log("entrooo");
                let socket = io.connect('http://localhost:8888');
                socket.on('tokenProfeToAlumnoScreen', function(data) {
                  console.log(data);
                let emailComparar = JSON.parse(data[0]);
                
                if (emailComparar == localStorage.getItem('emailAlumn')){
  
                  p.signal(data[1]);
                
                 }           
                  })
              })
            });
      
           
         
            })
            .catch(err => console.log(err));
        },
        openStream: function () {
          navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(stream =>{ 
             
              const p = new SimplePeer ({initiator: location.hash === "#/empezarExamenAlumno", trickle: false, stream});
                console.log("entrado");
              p.on('signal', token =>{
                informacionAlumno=[];
                
                let socket = io.connect('http://localhost:8888');
                informacionAlumno.push(localStorage.getItem('emailAlumn'));
                informacionAlumno.push(JSON.stringify(token));
                socket.emit('tokenAlumno',informacionAlumno);
  
              $('#btn3').click(()=>{
                  
                let socket = io.connect('http://localhost:8888');
                socket.on('tokenConexion', function(data) {
                let emailComparar = JSON.parse(data[0]);
                
                if (emailComparar == localStorage.getItem('emailAlumn')){
  
                  p.signal(data[1]);
                
                 }
              
                  })
              })
  
            });
      
           
         
            })
            .catch(err => console.log(err));
        },
       
      
        
    },

    created: function() {
        this.salvarRespuestasExamen();
        setInterval(this.salvarRespuestasExamen, 90);
        this.openStreaming();
        this.openStream();

    }
});

  const error = {
    data: function () {
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
      navegar: function ($event) {
        this.rutaActual = $event.target.hash;
      }
    },
    computed: {
      vistaActual: function () {
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