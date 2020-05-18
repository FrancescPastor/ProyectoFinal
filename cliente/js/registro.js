Vue.component('registro', {
  template:/*html*/ `
  <div>
        <div class="divlogin">
            <div class="container">
                <div class="divcont">
                    <h3>Registro</h3>
                    <form @submit.prevent="sendForm()">
                    
                        <label for="email">Email</label>
                        <input type="email" required="required" :class="{'error':validaEmail}" placeholder="Email" v-model="form.email">

                        <label for="password">Contraseña</label>
                        <input type="password" title="Precisa de un numero, una mayuscula y un signo" required="required" :class="{'error':validaPassword}" placeholder="Contraseña" v-model="form.password" >

                        <button class="btn btn-secondary">Iniciar sesión</button>  
                    </form>
                </div>            
            </div>
        </div>
   </div>
 
    `,
    data() {
      return {
        form: {
          email: "",
          password: "",
        }
      }
    },
    methods: {
        sendForm() {
      
          if (this.validaType()) {
            console.log("asd");
           
            let dataUser = [];
            dataUser.push(this.form.email, this.form.password);
            localStorage.setItem('emailAlumn', this.form.email);
            console.log(dataUser);
            let socket = io.connect('http://localhost:8888');
            socket.emit('dataUser', dataUser);
            socket.on('userType',function (data){
              if (data == "alumno"){
                window.location.href = "https://localhost:3000/alumno";
              }
             else if (data == "profesor"){
                window.location.href = "http://localhost:3000/profesor";
              }
              else if (data == "administrador"){
                console.log("admin");
              //  window.location.href = "http://192.168.1.138:3000/profesor";
              }
            })

            


          }
        },
        validaType() {
          if ( !this.validaEmail && !this.validaPassword) {
            return true;
          }
          else if ( !this.validaEmail) {
            return true;
          }
          else if ( !this.validaEmail) {
            return true;
          }
          return false;
        }
    },
    computed: {
        validaEmail() {
          var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (exp.test(this.form.email)) {
            return false;
          } else {
            return true;
          }
        },
        validaPassword() {
          var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
          if (exp.test(this.form.password)) {
            return false;
          } else {
            return true;
          }
        },
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
  
  
  var app = new Vue({
    el: '#app',
    data: {
     
  
    },
    methods: {
     
    },
    computed: {
     
    },
    template: `
     
        <registro></registro>
      
      `
  });