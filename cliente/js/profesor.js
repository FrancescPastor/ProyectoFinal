var tokenAlumn = "";
Vue.component('men', {
    template: /*html*/ `
<div>
<p>hola crack</p>
<p>hola crack</p>
</div> 

  `,

    data() {

        return {
            vacia: []
        }
    },


});

Vue.component('subidaExamen', {
    template: /*html*/ `
<div>
  <form>
      <div class="form-row mb-8 col-md-4">
        <label for="clase">Clase</label>
        <select class="form-control" id="clase">
          <option selected>Ninguno</option>
          <option value="1">Clase 1</option>
          <option value="2">Clase 2</option>
          <option value="3">Clase 3</option>
        </select> <br/>
    
        <label  for="clase">Asignatura</label>
        <select class="custom-select" id="clase">
          <option selected>Ninguna</option>
          <option value="1">Mates</option>
          <option value="2">Sociales</option>
          <option value="3">Lengua</option>
        </select>
        </div><br/>
  
      <div class="form-group mb-3 col-md-4">
        <div class="">
        <input type="file" id="file" style="display:none;" />
        <button class="btn btn-secondary" ><i class="fas fa-file-upload"></i>&nbsp;Upload</button>
        </div>
      </div>
    <br/>
      <div class="form-group mb-3 col-md-4">
      <button type="submit" class="btn btn-danger">Empezar Exámen</button>
      </div> 
  </form>
</div> 
  `,

    data() {

        return {
            vacia: []
        }
    },
    methods: {


    }


});

Vue.component('listaAlumnos', {
    template: /*html*/ `
<div>
  <form>
      <div class="form-row mb-8 col-md-4">
        <label for="clase">Clase</label>
        <select class="form-control" id="clase">
          <option selected>Ninguno</option>
          <option value="1">Clase 1</option>
          <option value="2">Clase 2</option>
          <option value="3">Clase 3</option>
        </select>
        </div><br/>

      <div class="form-group mb-3 col-md-4">
      <button type="submit" class="btn btn-secondary"><i class="fas fa-eye"></i>&nbsp;Mostrar</button>
      </div> 
   </form>
   <div class="centroTab">
     <table id="tablaListaAlumno" class="table table-striped">
         <thead>
            <tr class="tituloOscuro">
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Años</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Télefono</th>
               <th scope="col">Calificaciones</th>
            </tr>
        </thead>
     <tbody>
       <tr  v-for="arrayAlumno in arrayAlumnos">
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.id"></td>
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.nombre"></td>
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.apellido"></td>
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.años"></td>
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.ciudad"></td>
              <td v-bind:id="arrayAlumno.id" v-text="arrayAlumno.telefono"></td>
              <td><button class="btn btn-secondary"><i class="fas fa-clipboard-list" style="width:20px"></i>&nbsp;Notas</button></td>
        </tr>
      </tbody>
    </table>
</div>

<div class="col-md-8">
  <div class="panel panel-default has-shadow">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-12">
          <form action="/create-exam" role="form" id="ExamAddForm" method="post" accept-charset="utf-8">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="ExamName">Nombre del examen</label> 
                <input name="data[Exam][name]" class="form-control" required="required" type="text" id="ExamName">
              </div>
            </div>
          </form>
        </div> 
      </div> 
    </div>
  </div>
</div>
</div> 
  `,

    data() {

        return {
            arrayAlumnos: [
                { id: 1, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 }
            ]
        }
    },
    methods: {

        thisFileUpload() {
            document.getElementById("file");


        }
    }


});

Vue.component('mostrarCamaras', {
    template: /*html*/ `
<div>
<video id="localVideo" autoplay playsinline controls="false"/>
<video id="friendStream" autoplay playsinline controls="false"/>
<textarea rows="3" width="300px" cols="50" id="txtMySignal"></textarea>
<input type="text" placeholder="El token de tu amigo" ref="txtTextSignal"></input>
<button id="btn1">dsfsd</button>
<button id="btn1" @click="pillarTokenAlumn">token alumno</button>
  <div id="accordion">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Camaras
          </button>
        </h5>
      </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
     
        <div class="centroTab">
          <table id="diseñoCamPant" class="table table-striped">
              <thead>   
              </thead>
            <tbody>
              <tr v-for="camara in listaCamaras">
                <td class="tamañoFilasPantCam" v-for="idCamara in camara">
                  <video class="tamañoFilasPantCam" v-bind:id="idCamara.id" autoplay playsinline controls="false"/>
                </td>    
              </tr>
             </tbody>
          </table>
        </div>      
      </div>
    </div>
  </div>
</div>
</div>
  `,
    data() {

        return {
            listaCamaras: [

                [{ id: 1, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 2, nombre: "f", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 3, nombre: "v", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 4, nombre: "c", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 5, nombre: "v", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 }
                ],

                [
                    { id: 6, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 8, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 }
                ]



            ]
        }
    },
    methods: {
      playVideo: function (stream, idVideo) {
        const video = document.getElementById(idVideo);
        video.srcObject = stream;
        video.onloadedmetadata = function () {
          video.play();
        }
      },
pillarTokenAlumn : function (){
/*
  let socket = io.connect('http://localhost:8888');
  socket.on('tokenAlumnoToProfesor', function(data) {
        
    tokenAlumn = data;
    console.log(tokenAlumn);
   
  })*/
},
    
  openStream: function () {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(stream =>{ 
        this.playVideo(stream, 'localVideo')
        const p = new SimplePeer ({initiator: location.hash === "#/monitorizacion", trickle: false, stream});
        p.on('signal', token =>{
          txtMySignal.innerHTML = JSON.stringify(token);
          console.log("genero token");
          let socket = io.connect('http://localhost:8888');
          socket.emit('tokenProfesor', JSON.stringify(token));
        });
      $('#btn1').click(()=>{
        
        let socket = io.connect('http://localhost:8888');
        socket.on('tokenAlumnoToProfesor', function(data) {
          console.log(data);
          let tokenA = JSON.parse(data);
      p.signal(tokenA);
        })
     
      console.log("genero segundo token");
      
      })
      
        p.on('stream', friendStream => this.playVideo(friendStream, 'friendStream'))
        })
      .catch(err => console.log(err));
  },
},
created: function () {
  this.openStream();
}


});
Vue.component('mostrarCompartirPantalla', {
    template: /*html*/ `
<div>
  <div id="accordion">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseOne">
            Pantallas
          </button>
        </h5>
      </div>

      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="card-body">
          <p>Yo molo</p>
            <div class="centroTab">
              <table id="diseñoCamPant" class="table table-striped">
                  <thead>   
                  </thead>
                <tbody>
                  <tr v-for="pantalla in listaPantallas">
                    <td class="tamañoFilasPantCam" v-for="idPantalla in pantalla">
                      <video class="tamañoFilasPantCam" v-bind:id="idPantalla.id" autoplay playsinline controls="false"/>
                    </td>    
                  </tr>
                </tbody>
              </table>
            </div>      
          </div>
        </div>
      </div>
    </div>
  </div>    
</div>
  `,

    data() {

        return {

        }
    },
    methods: {
      listaPantallas(){console.log("listapantallas");}
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
const subirExamen = {
    template: `
  <div>

  <subidaExamen></subidaExamen>
  </div>
   `
};
const listaAlumnos = {
    template: `
  <div>

  <listaAlumnos></listaAlumnos>
  </div>
   `
};
const monitorizacion = {
    template: `
  <div>
    <mostrarCamaras></mostrarCamaras>
    <mostrarCompartirPantalla></mostrarCompartirPantalla>
  </div>
   `
};

const rutes = {

    '#/subirExamen': subirExamen,
    '#/listaAlumnos': listaAlumnos,
    '#/monitorizacion': monitorizacion

};


var app = new Vue({
    el: '#app',
    data: {
        rutaActual: window.location.hash,
        rutes: rutes,
        menuVisible: false,

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
      <a class="navbar-brand">Profesor</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span id="iconoMenu" class="fas fa-bars"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link"  href="#/subirExamen" v-on:click="navegar">Examinar <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/listaAlumnos" v-on:click="navegar">Alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/monitorizacion" v-on:click="navegar">Monitorizacion</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/examenesRealizados">Examenes Realizados</a>
          </li>
        <!--<li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>-->
        </ul>
      </div>
    </nav>
    <div v-bind:is="vistaActual"> 
    </div>
</div>
    `
});