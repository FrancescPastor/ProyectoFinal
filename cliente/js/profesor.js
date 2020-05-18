var tokenAlumn = "";
var x = 0;
var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};

var listaAA = [];
//let idAlumnoGlobal = 0;
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

<textarea rows="3" width="300px" cols="50" id="txtMySignal"></textarea>
<input type="text" placeholder="El token de tu amigo" ref="txtTextSignal"></input>
<video id="videoScr" autoplay playsinline controls="false"/>


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
            <tr>
              <td class="tamañoFilasPantCam"  v-for="listaAlumno in listaAA">
                <video class="tamañoFilasPantCam" v-bind:id="listaAlumno.idAlumno" autoplay playsinline controls="false"/>
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
      <div  v-for="listaAlumno in listaAA">
        <div id="iduno">
          <button v-bind:id="listaAlumno.idAlumno" class="alumnoInfo"  v-text="listaAlumno.nombreAlumno"> </button>     
      </div>
    </div>

  </div>
</form>
</div>
`,

  data() {


    return {
      form: {
        id: ""
      },
      idAlumno: 0,
      listaAA: [],
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

      ],

    }

  },
  methods: {


    a: function () {

      if (localStorage.getItem('tokenAlumno') === null) {
        localStorage.setItem('tokenAlumnoScreen','[]');
      } else {
        var cogerArrayLocal = JSON.parse(localStorage.getItem('tokenAlumno'));
      }
      if (listaAA.length < cogerArrayLocal.length) {
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
        .then(stream => {
          this.playVideo(stream, 'localVideo')
          const p = new SimplePeer({ initiator: location.hash === "#/", trickle: false, stream });

          p.on('signal', token => {
            txtMySignal.innerHTML = JSON.stringify(token);
            info = [];
            nombreAl1 = localStorage.getItem('alumnoNombreSeñal');
            info.push(nombreAl1, token);
            let socket = io.connect('http://localhost:8888');
            socket.emit('tokenProfesor', info);

          });


          $(document).on('click', '.alumnoInfo', (e) => {


            console.log("pruebarara");
            console.log(e.currentTarget.id);


            let arrayToken = JSON.parse(localStorage.getItem('tokenAlumno'));
            for (i = 0; i < arrayToken.length; i++) {
              if (arrayToken[i].idAlumno == e.currentTarget.id) {

                let tokenA = arrayToken[i].token;
                p.signal(tokenA);
                localStorage.setItem('alumnoNombreSeñal', JSON.stringify(arrayToken[i].nombreAlumno));

              }
            }
            for (rec = 0; rec < this.listaAA.length; rec++) {

              if (this.listaAA[rec].idAlumno == e.currentTarget.id) {

                let gh = JSON.parse(this.listaAA[rec].idAlumno);
                p.on('stream', friendStream => this.playVideo(friendStream, gh));

              }
            }

          })

        })
        .catch(err => console.log(err));

    },


    subirAlLocal: function () {
    
      let socket = io.connect('http://localhost:8888');
      socket.on('listaAlumnos', function (data) {
        localStorage.setItem('tokenAlumno', JSON.stringify(data));

      })
    },

  },

  created: function () {

    this.openStream();
    this.a();
    this.listaAA = setInterval(this.a, 3000);
    this.subirAlLocal();
    setInterval(this.subirAlLocal, 3000);  
    //  this.getScreenConstraints();

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
          <video id="videoPantalla"  autoplay playsinline controls="false"/>
          <button @click="startCapture()">start</button>
          <button @click="stopCapture()">stop</button>
     
          <div class="centroTab">
              <table id="diseñoCamPant" class="table table-striped">
                  <thead>   
                  </thead>
                <tbody>
                   <tr>
                      <td class="tamañoFilasPantCam"  v-for="listaS in listaStreaming">
                        <video class="tamañoFilasPantCam" v-bind:id="listaS.idAlumno" autoplay playsinline controls="false"/>
                      </td>    
                   </tr>
                </tbody>
              </table>
            </div>      
            <div id="prueba">
              <div  v-for="listaAlumnoS in listaStreaming">
                <div id="iduno1">
                  <button v-bind:id="listaAlumnoS.idAlumno" class="alumnoInfoScreen"  v-text="listaAlumnoS.nombreAlumno"> </button>     
              </div>
            
           </div>
           <textarea rows="3" width="300px" cols="50" id="txtMySignal1"></textarea>
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
      listaStreaming: [],
    }
  },

  methods: {
    listaPantallas() { console.log("listapantallas"); },

    recogerLocalS: function () {

      if (localStorage.getItem('tokenAlumnoScreen') === null) {
        localStorage.setItem('tokenAlumnoScreen','[]');
      } else {
        var cogerArrayLocalS = JSON.parse(localStorage.getItem('tokenAlumnoScreen'));
      }
      if (listaAA.length < cogerArrayLocalS.length) {
        this.listaStreaming = cogerArrayLocalS;
      }
    }, 
    subirAlLocalScreen: function () {
      let socket = io.connect('http://localhost:8888');
      socket.on('tokenAlumnoToProfeScreen', function (data) {
        localStorage.setItem('tokenAlumnoScreen', JSON.stringify(data));

      })
    },
    startCapture: async function () {
      const videoElem = document.getElementById("videoPantalla");
    
      try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

      } catch (err) {
        console.error("Error: " + err);
      }
    },
    stopCapture: function (evt) {
      const videoElem = document.getElementById("videoPantalla");
      let tracks = videoElem.srcObject.getTracks();

      tracks.forEach(track => track.stop());
      videoElem.srcObject = null;
    },
    openStreaming: function () {
      navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
        .then(stream =>{ 
          this.startCapture(stream, 'videoPantalla')
          const p = new SimplePeer ({initiator: location.hash === "#/", trickle: false, stream});
           
          p.on('signal', token =>{
           txtMySignal1.innerHTML = JSON.stringify(token);
           infoScr = [];
           nombreS = localStorage.getItem('alumnoNombreSeñalScreen');
           infoScr.push(nombreS, token);
           let socket = io.connect('http://localhost:8888');
           socket.emit('tokenProfesorScreen', infoScr);
           
        });

        $(document).on('click', '.alumnoInfoScreen', (e) => {


          console.log("pruebarara");
          console.log(e.currentTarget.id);

          let arrayTokenS = JSON.parse(localStorage.getItem('tokenAlumnoScreen'));
          for (i = 0; i < arrayTokenS.length; i++) {
            if (arrayTokenS[i].idAlumno == e.currentTarget.id) {

              let tokenS = arrayTokenS[i].token;
              p.signal(tokenS);
              localStorage.setItem('alumnoNombreSeñalScreen', JSON.stringify(arrayTokenS[i].nombreAlumno));

            }
          }
          for (yy = 0; yy < this.listaStreaming.length; yy++) {

            if (this.listaStreaming[yy].idAlumno == e.currentTarget.id) {
              
              let idScreen = JSON.parse(this.listaStreaming[yy].idAlumno);
              console.log("ID_");
              console.log(idScreen);
              p.on('stream', friendStream => this.startCapture(friendStream, idScreen));

            }
          }

        })
       
      //  p.on('stream', friendStream => this.playVideo(friendStream, 'friendStream'))
        })
        .catch(err => console.log(err));
    },
    startCapture: async function (stream, idStream) {
      const videoElem = document.getElementById(idStream);
    
      try {
        videoElem.srcObject = await stream;

      } catch (err) {
        console.error("Error: " + err);
      }
    },
    stopCapture: function (evt) {
      const videoElem = document.getElementById("videoPantalla");
      let tracks = videoElem.srcObject.getTracks();

      tracks.forEach(track => track.stop());
      videoElem.srcObject = null;
    },
  },
  created : function (){
    this.openStreaming();
    this.subirAlLocalScreen();
    this.listaStreaming = setInterval(this.subirAlLocalScreen, 3000);
    this.recogerLocalS();
    setInterval(this.recogerLocalS, 3000);     
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

    guardarAlumnoNuevo: function () {

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
Vue.component('generarExamen', {
  template: /*html*/ `
<div>
<form  class="col-12 mt-2">
  <fieldset class="mb-5">
    <div v-show="examenok" class="form-group row">
    <div class="col-lg-2"> 
          <label for="nombreExamen">Nombre del examen:</label>
        </div>
        <div class="col-lg-2"> 
          <input  class="form-control" type="text" v-model="nombreExamen"></input>  
        </div>
        <div class="col-lg-1">
          <label for="materia">Materia:</label>
        </div>
        <div class="col-lg-2"> 
          <select class="custom-select" v-model="nombreMateria">
            <option selected="true" value="">Ninguno/a</option>
            <option value="1">Mates</option>
            <option value="2">Sociales</option>
            <option value="3">Lengua</option>
          </select>
        </div>
        <div class="col-lg-1">
          <label for="materia">Aula</label>
        </div>
        <div class="col-lg-2"> 
          <select class="custom-select" v-model="nombreAula">
            <option selected="true" value="">Ninguno/a</option>
            <option value="1">Aula 1</option>
            <option value="2">Aula 2</option>
            <option value="3">Aula 3</option>
          </select>
        </div>
        <div class="col-lg-2"> 
          <button class="botonGuardar btn btn-success btn-block" id="botonGuardarExamen" @click="guardarInput">Guardar Examen</button>  
        </div>
      </div> 
    <div v-show="examenok" class="form-group row">
      <div class="col-lg-2"> 
        <button id="botonPregunta" class="btn btn-block" id="botonAñadirPregunta" @click="generarInputs">Añadir Pregunta</button>
      </div> 
    </div>
    <div id="containerrr" v-show="examenok" class="row justify-content-center"> 
      <div class="col-lg-12"  v-for="inputText in inputTexts"> 
        <div class="form-group row">
          <div class="col-lg-12"> 
            <textarea v-bind:id="inputText.idInput" placeholder="Escriba aquí su pregunta..." v-model="inputText.elementos" v-text="inputText.elementos" rows="3"  column="5" class="form-control form-control-lg col-md-12"></textarea>
          </div> 
          <div class="col-lg-4"> 
            <button v-show="examenok" class="botonBorrar btn btn-danger btn-block" v-bind:id="inputText.idInput" @click="borrarInput($event)">Eliminar Pregunta</button> 
          </div> 
        </div>
      </div> 
    </div> 
    <div id="containerrr" v-show="!examenok" class="row justify-content-center"> 
      <div class="form-group row">
        <div class="col-lg-12"> 
          <button  @click="volverHacerExamen" >Hacer Otro Examen</button> 
          <p>Guardado con exito</p> 
        </div> 
      </div>
    </div>  
  </fieldset>
</form>
</div> 

`,
  data() {

      return {
          vacia: [],
          counter: 0,
          inputTexts: [],
          examenok: true,
          nombreMateria: "",
          nombreExamen: "",
          nombreAula: "",

      }

  },
  methods: {
      volverHacerExamen: function() {
          window.location.reload();
      },
      generarInputs: function() {
          x++;
          this.inputTexts.push({ idInput: x, elementos: "" });
      },
      borrarInput: function(event) {
          for (i = 0; i < this.inputTexts.length; i++) {
              if (this.inputTexts[i].idInput == event.currentTarget.id) {
                  var id = JSON.parse(i);
                  this.inputTexts.splice(id, 1)
              }
          }
      },
      salvarExamen: function() {
          localStorage.setItem("Examen", JSON.stringify(this.inputTexts))

      },
      guardarInput: function() {

          var preguntasExamen = JSON.parse(localStorage.getItem("Examen"));
          var informacionExamen = [];

          informacionExamen.push({ nombreExamen: this.nombreExamen, nombreMateria: this.nombreMateria, nombreAula: this.nombreAula, preguntas: preguntasExamen });
          let socket = io.connect('http://localhost:8888');
          socket.emit('examen', informacionExamen)

          this.examenok = false

      }
  },
  created: function() {
      setInterval(this.salvarExamen, 1000);

  }
});
Vue.component('empezarExamen', {
  template: /*html*/ `
<div>
<div class="col-12 mt-2 mb-5 ">
<div class="form-group row">
  <div class="col-lg-1">
    <label for="materia">Materia:</label>
  </div>
  <div class="col-lg-2"> 
    <select class="custom-select" v-model="nombreExamenAMostrar">
      <option selected="true" value="">Ninguno/a</option>
      <option v-for="nombre in listaNombresDeLosExamenes" v-text="nombre.nombre" ></option>
    </select>
  </div>
  <div class="col-lg-2"> 
    <button id="botonGuardar" class="btn btn-block" @click="mostrarExamenCompleto">Mostrar</button>
  </div>
</div>
 <div class="form-group row">  
    <div class="col-lg-12">   
      <h1>{{nombreExamenAMostrar}}</h1>
    </div>
  </div>
 <div class="form-group row">  
        <div   class="col-lg-12">    
          <p  id="preguntas" v-for="pregunta in listaPreguntasDeLosExamenes" for="nombre" v-text="pregunta.preguntas" ><b></b></p>
        </div>
    </div>
  <div class="form-group row">  
    <div class="col-md-4"> 
      <button v-show="!enviarExamen" id ="botonEnviarExamen" class="btn btn-danger btn-block" @click="enviarExamenAlAlumno">Enviar Exámen al Alumno</button>
    </div>
  </div>
</div>
</div> 

`,

  data() {

      return {
          vacia: [],
          listaNombresDeLosExamenes: [],
          nombreExamenAMostrar: "",
          listaPreguntasDeLosExamenes: [],
          enviarExamen: true
      }
  },
  methods: {
      mostrarExamenCompleto: function() {
          var preguntasExamen = [];
          this.nombreExamenAMostrar
          let socket = io.connect('http://localhost:8888');

          socket.emit('mostrarExamenCompleto', this.nombreExamenAMostrar);


          socket.on('examenCompleto', function(examenesCompleto) {
              preguntasExamen = examenesCompleto;
          })

          setTimeout(() => {
              this.listaPreguntasDeLosExamenes = preguntasExamen;
              this.enviarExamen = false;
          }, 2000);


      },

      mostrarExamenesCombo: function() {
          var nombres = [];
          console.log("dentro");
          let socket = io.connect('http://localhost:8888');

          socket.on('mostrarExamen', function(mostrar) {
              for (i = 0; i < mostrar.length; i++) {
                  nombres.push({ nombre: mostrar[i] });
              }
          })

          this.listaNombresDeLosExamenes = nombres
      },

      enviarExamenAlAlumno: function() {

          let socket = io.connect('http://localhost:8888');

          socket.emit('enviarExamenes', this.nombreExamenAMostrar);
      }
  },

  created: function() {
      this.mostrarExamenesCombo();

  }
});
Vue.component('corregirExamen', {
  template: /*html*/ `
<div>
<div class="col-12 mt-2 mb-5 ">
<div class="form-group row">
  <!--<div class="col-lg-1">
    <button @click="recuperarNombreExamenes" for="examenPendiente">Examenes Pendientes De Corrección</button>
  </div>-->
  <div class="col-lg-4">
    <ul>
      <li class="list-group-item list-group-item-action list-group-item-dark" v-bind:id="pendientes.nombre" @click="mostrarAlumnosDelExamen($event)" v-text="pendientes.nombre" v-for="pendientes in listaExamenesPendientes"></li>
    </ul> 
  </div>
  <!--<div class="col-lg-2"> 
    <select class="custom-select" v-model="nombreExamenAMostrar">
      <option selected="true" value="">Ninguno/a</option>
      <option v-for="nombre in listaNombresDeLosExamenes" v-text="nombre.nombre" ></option>
    </select>
  </div>
  <div class="col-lg-2"> 
    <button id="botonGuardar" class="btn btn-block" @click="mostrarExamenCompleto">Mostrar</button>
  </div>
</div>
 <div class="form-group row">  
    <div class="col-lg-12">   
      <h1>{{nombreExamenAMostrar}}</h1>
    </div>
  </div>
 <div class="form-group row">  
        <div   class="col-lg-12">    
          <p  id="preguntas" v-for="pregunta in listaPreguntasDeLosExamenes" for="nombre" v-text="pregunta.preguntas" ><b></b></p>
        </div>
    </div>
  <div class="form-group row">  
    <div class="col-lg-12"> 
      <button v-show="!enviarExamen" class="btn btn-info btn-block" @click="enviarExamenAlAlumno">Enviar Exámen al Alumno</button>
    </div>
  </div>-->
  </div>
</div>
</div> 

`,

  data() {

      return {
          listaExamenesPendientes: [],
          listaNombresEmailAlumnos: []

      }
  },
  methods: {

      recuperarNombreExamenes: function() {
          var listaEx = []
          let socket = io.connect('http://localhost:8888');
          socket.on('mostrarExamen', function(mostrarExamen) {

              for (i = 0; i < mostrarExamen.length; i++) {

                  listaEx.push({ nombre: mostrarExamen[i] });

              }

          })

          this.listaExamenesPendientes = listaEx;

      },
      mostrarAlumnosDelExamen: function(event) {
          let nombreExamen = event.currentTarget.id;
          let nombresEmailAlumnos = [];

          let socket = io.connect('http://localhost:8888');

          socket.emit('nombreAlumnosDelExamenACorregir', nombreExamen);

          socket.on('nombreAlumnosExamenReal', function(nombresAlumnos) {

              nombresEmailAlumnos = nombresAlumnos;
              console.log(nombresAlumnos);
          })

          setTimeout(() => {
              this.listaNombresEmailAlumnos = nombresEmailAlumnos
          }, 2000);



      }



  },
  created: function() {
      this.recuperarNombreExamenes();

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
const generarExamenes = {
  template: `
<div>
  <generarExamen></generarExamen>
 
</div>
 `
};
const empezarExamen = {
  template: `
<div>
  <empezarExamen></empezarExamen>
 
</div>
 `
};
const corregirExamen = {
  template: `
<div>
  <corregirExamen></corregirExamen>
 
</div>
 `
};
const rutes = {

  '#/listaAlumnos': listaAlumnos,
  '#/monitorizacion': monitorizacion,
  '#/registroAlumnos': registroAlumnos,
  '#/generarExamenes': generarExamenes,
  '#/empezarExamen': empezarExamen,
  '#/corregirExamen': corregirExamen,

};


var app = new Vue({
  el: '#app',
  data: {
    rutaActual: window.location.hash,
    rutes: rutes,
    menuVisible: false,

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
      <a class="navbar-brand">Profesor</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span id="iconoMenu" class="fas fa-bars"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/listaAlumnos" v-on:click="navegar">Alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/monitorizacion" v-on:click="navegar">Monitorizacion</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="#/registroAlumnos"  v-on:click="navegar">Registrar Alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/generarExamenes"  v-on:click="navegar">Generar Exámen</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="#/empezarExamen"  v-on:click="navegar">Empezar Exámen</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="#/corregirExamen"  v-on:click="navegar">Corregir Exámen</a>
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