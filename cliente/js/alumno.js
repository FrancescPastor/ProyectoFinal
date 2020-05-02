Vue.component('alumno', {
  template:/*html*/ `
<div>

<button @click="probarconexion">Conexion</button>
<button @click="conexionCamara">Camara</button>
<button @click="recuperarToken">Token</button>

<video id="localVideo" autoplay playsinline controls="false"/>
<textarea rows="3" width="300px" cols="50" id="txtMySignal"></textarea>
<input type="text" placeholder="El token de tu amigo" ref="txtTextSignal"></input>
<button @click="enviarToken">Connectar</button>
</div> 

  `,

  data() {
    //varaible para utilizar la peer que luego la retorno como p en return i asi la puedo usar en todas las funciones de methods.
    var p1 = new SimplePeer ({initiator: location.hash === '#/', trickle: false});
    return {
      vacia: [],
      p : p1
      
    }
  },
  methods: {
    
    //esto se va a borrar en un futuro 
    probarconexion: function (event) {
      let socket = io.connect('http://localhost:8888');
      socket.on('hola', function (data) {
        console.log(data);
      })
    },

    conexionCamara: function (event) {
      const constraints = {
        'video': true,
        'audio': true
      }
      /**Promesa que mira si estan conectados los dispositivos y si el usuario 
      *le da los permisos entonces si la promesa sale bien llamo a la funciun que muestra
      *la camara por pantalla y si no es que no hay dispositivos o no tiene permisos
      *entonces printa un console log 
      */
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          //Miramos las camaras que hay conectadas y micros
          function getConnectedDevices(type, callback) {
            navigator.mediaDevices.enumerateDevices()
              .then(devices => {
                const filtered = devices.filter(device => device.kind === type);
                callback(filtered);

              });
          }
          getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));
          //Llamar funcion que activa la camara y la muestra por pantalla.  
          playVideoFromCamera();
          //funcion que muestra la camara por pantalla
          async function playVideoFromCamera() {

            try {
              const constraints = { 'video': true, 'audio': true };
              const stream = await navigator.mediaDevices.getUserMedia(constraints);
              const videoElement = document.querySelector('video#localVideo');
              videoElement.srcObject = stream;
            } catch (error) {
              console.error('Error opening video camera.', error);
            }
          }
          //En este console log tenemos la variable stream que te da la id del stream      
          console.log('Got MediaStream:', stream);
        })
        .catch(error => {
          console.error('Error accessing media devices.', error);
        });
    },
    recuperarToken : function (event){
     
      this.p.on('signal', token=>{
        txtMySignal.innerHTML = JSON.stringify(token);
      });
    },
    enviarToken : function (event){
    
      //con el this.refs cojo el valor del value del input text area que tenemos en el template
     let friendSignal = JSON.parse(this.$refs.txtTextSignal.value);
     this.p.signal(friendSignal);
     this.recuperarToken();
     this.verData();
    },
    verData : function (event){
      this.p.on('connect', ()=>{
        setInterval(()=> this.p.send(Math.random()), 2000);
      });
      this.p.on('data', data => console.log(data));
    }

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

const principal = {
  template: `
    <div>
    <p>Benvinguts a Vue.js</p>
    <alumno></alumno>
    </div>
  
    `
};
const segundo = {
  template: `
    <div>
    <p>segundo</p>
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
  '#1/':segundo,
  '#/contacte': contacte,
  

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
          <li>
          <a href="#1/" 
            v-on:click="navegar">
              segundo
          </a>
        </li>
        </ul>
        <div v-bind:is="vistaActual">        
        </div>
      </div>
      `
});