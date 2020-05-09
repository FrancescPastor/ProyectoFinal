
 
  let tokenProfe = "";
  Vue.component('alumno', {
    template:/*html*/ `
  <div>
  
  <button id="btn1">dsfsd</button>
  
  
  <video id="localVideo" autoplay playsinline controls="false"/>
  <video id="friendStream" autoplay playsinline controls="false"/>
  <textarea rows="3" width="300px" cols="50" id="txtMySignal"></textarea>
  <input type="text" placeholder="El token de tu amigo" ref="txtTextSignal"></input>
  <button id="btn1" @click="tokenProfe">conectar camara</button>
  
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
      tokenProfe : function (){/*
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(stream =>{ 
          this.playVideo(stream, 'localVideo')
          const p = new SimplePeer ({initiator: location.hash === "#/", trickle: false, stream});
          p.on('signal', token =>{
            txtMySignal.innerHTML = JSON.stringify(token);
            console.log("genero token");
            let socket = io.connect('http://localhost:8888');
            socket.emit('tokenAlumno', JSON.stringify(token));
          });
  
       
          p.on('stream', friendStream => this.playVideo(friendStream, 'friendStream'))
          })
        .catch(err => console.log(err));
          let socket = io.connect('http://localhost:8888');
          socket.on('tokenProfesorToAlumno', function(data) {
          
          tokenProfe = data;
         
        })
  */
     },
     openStream: function () {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
          .then(stream =>{ 
            this.playVideo(stream, 'localVideo')
            const p = new SimplePeer ({initiator: location.hash === "#/monitorizacion", trickle: false, stream});
            p.on('signal', token =>{
              txtMySignal.innerHTML = JSON.stringify(token);
              let socket = io.connect('http://localhost:8888');
              socket.emit('tokenAlumno', JSON.stringify(token));
              console.log("genero token");
             
              //aqui se genera el primer token 
              //esto en vez de hacer el iner lo pasaremos con websockets
            });
         $('#btn1').click(()=>{
        //  let friendSignal = JSON.parse(this.$refs.txtTextSignal.value);
         let socket = io.connect('http://localhost:8888');
          socket.on('tokenProfesorToAlumno', function(data) {
          
          tokenProfe = JSON.parse(data);
          console.log(tokenProfe);
          p.signal(tokenProfe);
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