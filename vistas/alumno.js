Vue.component('alumno',{
  template: `
<div>

<button @click="probarconexion">click</button>
<button @click="hola">fea</button>
</div>

  `,

  data(){ 
    
    return {
      vacia: []
    }
  },  
  methods: {
  probarconexion: function(event){
    let socket = io.connect('http://localhost:8888');
    socket.on('hola',function(data){
    console.log(data);
    })
  },

  hola : function(event){
    console.log("sada")
    navigator.getMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia);

navigator.getMedia (

// Restricciones (contraints) *Requerido
{
video: true,
audio: true
},

// Funcion de finalizacion (Succes-Callback) *Requerido
function(localMediaStream) {
var video = document.querySelector('video');
//video.src = window.URL.createObjectURL(localMediaStream);
try {
  video.srcObject = localMediaStream;
} catch (error) {
  //video.src = window.URL.createObjectURL(localMediaStream);
  //video.src = (window.URL ? URL : webkitURL).createObjectURL(event.data);
 
}

video.onloadedmetadata = function(e) {
// Haz algo con el video aquí.
};
},

// errorCallback *Opcional
function(err) {
console.log("Ocurrió el siguiente error: " + err);
}

)

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
  
  const principal = {
    template: `
    <div>
    <p>Benvinguts a Vue.js</p>
    <alumno></alumno>
    </div>
  
    `
  };
  const contacte = {
    template: `
      <p>sergi.grau@fje.edu</p>
    `
  };
  
  const rutes = {
    '#/': principal,
    '#/contacte': contacte
  
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
    template: `
      <div>
        <ul>
          <li>
            <a href="#/" 
              v-on:click="navegar">
                Principal
          
            </a>
          </li>
          <li>
            <a href="#/contacte" 
              v-on:click="navegar">
                Contacte
            </a>
          </li>
        </ul>
        <div v-bind:is="vistaActual">        
        </div>
      </div>
      `
  });