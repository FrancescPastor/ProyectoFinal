Vue.component('registrarProfesor', {
    template: /*html*/ `
<div>
<form @submit.prevent="guardarProfesorNuevo()" class="col-12 mt-2">
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
            <input id ="tipo" class="form-control" disabled value="Profesor" type="text"/>
          </div>
    </div>
    <div class="form-group row">    
      <div class="col-lg-2">    
        <label for="clase">Fecha Nacimiento</label>
      </div>
      <div class="col-lg-2">    
        <input class="form-control"  type="date" required placeholder="Escriba fecha nac." v-model="form.edad"/>
      </div>   
    </div>
    <div class=" float-md-left row">
      <div class="col-lg-2">       
        <button type="submit" class="btn btn-danger">Guardar</button>
      </div> 
    </div> 
  </fieldset>
</form>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Información Registro Profesor</h5>
        </div>
        <div class="modal-body">
          Profesor Guardado Correctamente
        </div>
        <div class="modal-footer">
          <button type="button" @click="refresh" class="btn btn-success" data-dismiss="modal">Guardar</button>
        </div>
      </div>
    </div>
  </div>

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
                edad: ""
            }

        }
    },
    methods: {
        refresh: function() {
            window.location.reload();
        },

        guardarProfesorNuevo: function() {

            datosProfesor = [
                this.nombre = this.form.nombre,
                this.apellido = this.form.apellido,
                this.email = this.form.email,
                this.contraseña = this.form.contraseña,
                this.ciudad = this.form.ciudad,
                this.direccion = this.form.direccion,
                this.cp = this.form.cp,
                this.telefono = this.form.telefono,
                this.tipo = "profesor",
                this.edad = this.form.edad
            ]
            let registroUsuario = [];
            registroUsuario.push(datosProfesor);
            console.log(registroUsuario);
            let socket = io.connect('http://localhost:8888');
            socket.emit('registroProfesor', registroUsuario);

            $("#exampleModal").modal("show");
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
const registrarProfesores = {
    template: `
<div>
  <registrarProfesor></registrarProfesor>
 
</div>
 `
};
const rutes = {

    '#/registrarProfesores': registrarProfesores,
    

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
          <li class="nav-item">
            <a class="nav-link" href="#/registrarProfesores" v-on:click="navegar">Registrar Profesores</a>
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