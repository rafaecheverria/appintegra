<template>

  <div>
    <card>
       <div slot="header">
        <span class="card-title
                     font-weight-normal
                     font-weight-light
                     text-white
                     small
                     text-white">Asignar Roles
        </span>
      </div>
      <div class="card-body">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <!-- Fila 1 -->
        <form @submit.prevent='handleSubmit(enviarFormulario)'>

       <div class="row">
          <div class="col-lg-4">
            <ValidationProvider
                    name="permisos"
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select class="select-primary"
                  size="large"
                  placeholder="Seleccione un rol para el ususario"
                  v-model="permisos"
                  multiple>
                <el-option v-for="permiso in array_permisos"
                    :error="failed ? 'Permisos es un campo requerido': null"
                    class="select-primary"
                    :value="permiso.id"
                    :label="permiso.name"
                    :key="permiso.id">
                </el-option>

              </el-select>
            </ValidationProvider>
          </div>
        </div>

          <br>
          <l-button @click="volver()" type="default">
            <span class="btn-label">
                <i class="fa fa-arrow-left"></i>
            </span>
            Volver
          </l-button>
             <button type="submit" class="btn btn-success btn-fill pull-right">Asignar Permisos</button>
             

          <div class="clearfix"></div>
      </form>
      </ValidationObserver>
      </div>
      <Load />
     </card>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import { Select, Option, DatePicker} from 'element-ui'
import { Load } from 'src/components/index'
import Swal from 'sweetalert2'

  export default {
    data (){
      return {
        accion:''
      }
    },
    components: {
      Load,
      [Select.name]: Select,
      [Option.name]: Option,
      [DatePicker.name]: DatePicker,
    },
    computed: {
      ...mapFields('roles', [ 'form', 'permisos']),
      ...mapState('roles', ['tipoAccion', 'array_permisos']),
      ...mapState('alerta', ['up']),
    },

    methods: {
      ...mapActions({
          limpiarFormulario: 'roles/clearForm',
          loading: 'loading/loading',
          insertar: 'roles/insertarPermisosRol',
        }),

     async enviarFormulario() {
        const isValid = await this.$refs.form.validate();
          if (!isValid) {
            return
          }
        this.$refs.form.reset(); //resetea los errores vee-validate
        Swal.fire(this.up).then((result) => {
          if (result.isConfirmed) {
            this.insertar({permisos: this.permisos, id: this.form.id}).then(() =>{
              this.$router.push('/configuracion/roles')
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      },

      volver(){
        this.limpiarFormulario()
        this.$router.push('/configuracion/roles')
      }
    },

    mounted () {
      this.loading(false)
      },
  }
</script>
<style>
.form-group {
    margin-bottom: 1rem;
}

.card-header:first-child {
    background:#122038;
    padding: 10px;
    width: 100%;
}
.bootstrap-switch .bootstrap-switch-handle-off {
    background-color: #122038;
}
.bootstrap-switch.bootstrap-switch-off .bootstrap-switch-handle-on {
    background-color: #122038;
}
.el-select {
  display: block;
}
</style>
