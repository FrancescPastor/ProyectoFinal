
 
  let tokenProfe = "";
  Vue.component('alumno', {
    template:/*html*/ `
  <div>
  
 
  <button id="btn3">Conectarse</button>
  
  <video id="localVideo" autoplay playsinline controls="false"/>
  <video id="friendStream" autoplay playsinline controls="false"/>
  
  <textarea rows="3" width="300px" cols="50" id="txtMySignal"></textarea>
  <input type="text" placeholder="El token de tu amigo" ref="txtTextSignal"></input>

  
  </div> 
  
    `,
  
    data() {
     
   
      return {
        vacia: [],
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
      
      openStream: function () {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
          .then(stream =>{ 
            this.playVideo(stream, 'localVideo')
            const p = new SimplePeer ({initiator: location.hash === "#/", trickle: false, stream});
              console.log("entrado");
            p.on('signal', token =>{
              informacionAlumno=[];
              txtMySignal.innerHTML = JSON.stringify(token);
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
    
         
          p.on('stream', friendStream => this.playVideo(friendStream, 'friendStream'))
          })
          .catch(err => console.log(err));
      },
    },
    created: function () {
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
    '#1/': segundo,
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