Vue.component('alumno', {
  template:/*html*/ `
<div>

<button @click="probarconexion">click</button>
<button @click="hola">fea</button>
<video id="localVideo" autoplay playsinline controls="false"/>

</div> 

  `,

  data() {

    return {
      vacia: []
    }
  },
  methods: {
    probarconexion: function (event) {
      let socket = io.connect('http://localhost:8888');
      socket.on('hola', function (data) {
        console.log(data);
      })
    },

    hola: function (event) {
      const constraints = {
        'video': true,
        'audio': true
      }
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
        /*Promesa que mira si estan conectados los dispositivos y si el usuario 
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



          //En este console log tenemos la variable stream que te da la id del stream      
          console.log('Got MediaStream:', stream);
        
      
        })
        .catch(error => {
          console.error('Error accessing media devices.', error);
        });

   
      },

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
        </ul>
        <div v-bind:is="vistaActual">        
        </div>
      </div>
      `
});