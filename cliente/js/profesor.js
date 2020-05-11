var tokenAlumn = "";
var listaAA = [];
let idAlumnoGlobal = 0;
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
<form>
    <div id="prueba">
        <ul  v-for="listaAlumno in listaAA">
            <button class="alumnoInfo" v-bind:id="listaAlumno.idAlumno" v-text="listaAlumno.nombreAlumno" >
            </button>     
        </ul>
    </div>
</form>
</div>
  `,

    data() {
   

        return {
          form: {
            id : ""
          },
          idAlumno:0,
           listaAA :[],
            listaCamaras: [

                [   { id: 1, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 2, nombre: "f", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 3, nombre: "v", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 4, nombre: "c", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 5, nombre: "v", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 }
                ],

                [
                    { id: 6, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 },
                    { id: 8, nombre: "paula", apellido: "tur", años: 25, ciudad: "Barcelona", telefono: 680361666 }
                ]

            ],

        }
       
    },
    methods: {
     
       
      a :function (){
        var cogerArrayLocal = JSON.parse(localStorage.getItem('tokenAlumno'));

      //  console.log(this.listaAA);
        console.log(cogerArrayLocal.length);
           if (listaAA.length<cogerArrayLocal.length){
             this.listaAA = cogerArrayLocal;
          }
                
      
       },
      playVideo: function (stream, idVideo) {
        const video = document.getElementById(idVideo);
        video.srcObject = stream;
        video.onloadedmetadata = function () {
          video.play();
        }
      },

    
  openStream: function () {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(stream =>{ 
        this.playVideo(stream, 'localVideo')
        const p = new SimplePeer ({initiator: location.hash === "#/monitorizacion", trickle: false, stream});
        p.on('signal', token =>{
          txtMySignal.innerHTML = JSON.stringify(token);
          let socket = io.connect('http://localhost:8888');
          socket.emit('tokenProfesor', JSON.stringify(token));
        });

    
     $('button').click(()=>{ 
        console.log("pruebarara");
        console.log(event.currentTarget.id);
              

                 let arrayToken = JSON.parse(localStorage.getItem('tokenAlumno'));
                  for (i=0; i<arrayToken.length; i++){
                    if(arrayToken[i].idAlumno==event.currentTarget.id){

                      let tokenA = arrayToken[i].token;
                      p.signal(tokenA);
                      p.on('stream', friendStream => this.playVideo(friendStream, 'friendStream'));
                    }
                  }  
                 
                  
                })
       })
      .catch(err => console.log(err));
     
  },
 

  subirAlLocal : function (){
    let socket = io.connect('http://localhost:8888');
    socket.on('listaAlumnos', function(data) {
    localStorage.setItem('tokenAlumno', JSON.stringify(data));

    })
  },

},
created: function () {
                        this.openStream();
                        this.a();
                        this.listaAA=setInterval(this.a, 3000);
                        this.subirAlLocal();
                        setInterval(this.subirAlLocal, 3000);
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

Vue.component('registroAlumno', {
  template: /*html*/ `
<div>
<form @submit.prevent="guardarAlumnoNuevo()" class="col-12 mt-2">
  <fieldset class="mb-5">
   <div class="form-group row">    
        <div class="col-lg-2">    
          <label for="nombre" >Nombre</label>
        </div>
        <div class="col-lg-2">    
          <input class="form-control" required placeholder="Escriba Nombre" type="text" v-model="form.nombre"/>
        </div>
        <div class="col-lg-2">    
          <label for="clase">Apellidos</label>
        </div>
        <div class="col-lg-2">    
          <input class="form-control"  type="text" required placeholder="Escriba Apellidos" v-model="form.apellido"/>
        </div>
        <div class="col-lg-2">    
          <label for="clase">Email</label>
        </div>
        <div class="col-lg-2">    
          <input class="form-control"  type="email" required placeholder="Escriba Email" v-model="form.email"/>
        </div>
    </div>
    <div class="form-group row">    
          <div class="col-lg-2">    
            <label for="clase">Password Registro</label>
          </div>
          <div class="col-lg-2">    
            <input class="form-control"  type="password" required placeholder="Escriba contraseña" v-model="form.contraseña"/>
          </div>
          <div class="col-lg-2">    
            <label for="clase">Ciudad</label>
          </div>
          <div class="col-lg-2">    
            <input class="form-control"  type="text" required placeholder="Escriba ciudad" v-model="form.ciudad"/>
          </div>
          <div class="col-lg-2">    
            <label for="clase">Dirección</label>
          </div>
          <div class="col-lg-2">    
            <input class="form-control" type="text" required placeholder="Escriba direccion" v-model="form.direccion"/>
          </div>
    </div>
    <div class="form-group row">    
          <div class="col-lg-2">    
            <label for="clase">Código Postal</label>
          </div>
          <div class="col-lg-2">    
            <input class="form-control" type="number" required placeholder="Escriba cp"  v-model="form.cp"/>
          </div>
          <div class="col-lg-2">    
            <label for="clase">Teléfono</label>
          </div>
          <div class="col-lg-2">    
            <input class="form-control" type="number"  required placeholder="Escriba teléfono"  v-model="form.telefono"/>
          </div>
          <div class="col-lg-2">    
            <label for="clase">Tipo</label>
          </div>
          <div class="col-lg-2">    
            <input id ="tipo" class="form-control" disabled value="Alumno" type="text"/>
          </div>
    </div>
    <div class="form-group row">    
      <div class="col-lg-2">    
        <label for="clase">Fecha Nacimiento</label>
      </div>
      <div class="col-lg-2">    
        <input class="form-control"  type="date" required placeholder="Escriba fecha nac." v-model="form.edad"/>
      </div>   
      <div class="col-lg-2">    
        <label for="clase">Clase</label>
      </div>
      <div class="col-lg-2">    
        <select class="form-control" v-model="form.clase">
            <option selected="true" value="">Ninguno/a</option>
            <option value="1">Clase 1</option>
            <option value="2">Clase 2</option>
            <option value="3">Clase 3</option>
        </select>
      </div>
      <div class="col-lg-2">  
        <label  for="clase">Asignatura</label>
      </div>
      <div class="col-lg-2"> 
          <select class="custom-select" v-model="form.asignatura">
            <option selected="true" value="">Ninguno/a</option>
            <option value="1">Mates</option>
            <option value="2">Sociales</option>
            <option value="3">Lengua</option>
          </select>
      </div>
    </div>
    <div class=" float-md-left row">
      <div class="col-lg-2">       
        <button type="submit" class="btn btn-danger">Guardar</button>
      </div> 
    </div> 
  </fieldset>
</form>
</div> 
`,

  data() {

      return {
          vacia: [],
          form: {
              nombre: "",
              apellido: "",
              email: "",
              contraseña: "",
              ciudad: "",
              direccion: "",
              cp: "",
              telefono: "",
              tipo: "",
              edad: "",
              clase: "",
              asignatura: ""
          }

      }
  },
  methods: {

      guardarAlumnoNuevo: function() {

          datosAlumno = [
              this.nombre = this.form.nombre,
              this.apellido = this.form.apellido,
              this.email = this.form.email,
              this.contraseña = this.form.contraseña,
              this.ciudad = this.form.ciudad,
              this.direccion = this.form.direccion,
              this.cp = this.form.cp,
              this.telefono = this.form.telefono,
              this.tipo = "alumno",
              this.edad = this.form.edad,
              this.clase = this.form.clase,
              this.asignatura = this.form.asignatura
          ]
          let registroUsuario = [];
          registroUsuario.push(datosAlumno);
          console.log(registroUsuario);
          let socket = io.connect('http://localhost:8888');
          socket.emit('registroAlumno', registroUsuario);
      }
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
const registroAlumnos = {
  template: `
  <registroAlumno></registroAlumno>
  `
};
const rutes = {

    '#/subirExamen': subirExamen,
    '#/listaAlumnos': listaAlumnos,
    '#/monitorizacion': monitorizacion,
    '#/registroAlumnos': registroAlumnos,

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
            <a class="nav-link" href="#/examenesRealizados" v-on:click="navegar">Examenes Realizados</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/registroAlumnos" v-on:click="navegar">Registrar Alumnos</a>
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