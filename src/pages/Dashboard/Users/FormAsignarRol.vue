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
                    name="roles"
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select class="select-primary"
                  size="large"
                  placeholder="Seleccione un rol para el ususario"
                  v-model="roles"
                  multiple>
                <el-option v-for="rol in array_roles"
                    :error="failed ? 'Roles es un campo requerido': null"
                    class="select-primary"
                    :value="rol.id"
                    :label="rol.name"
                    :key="rol.id">
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
             <button type="submit" class="btn btn-success btn-fill pull-right">Asignar Roles</button>
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
      ...mapFields('users', [ 'form', 'roles']),
      ...mapState('users', ['array_roles']),
      ...mapState('alerta', ['up']),
    },

    methods: {
      ...mapActions({
          limpiarFormulario: 'users/clearForm',
          loading: 'loading/loading',
          insertar: 'users/insertarRolUser',
        }),

     async enviarFormulario() {
        const isValid = await this.$refs.form.validate();
          if (!isValid) {
            return
          }
        this.$refs.form.reset(); //resetea los errores vee-validate
        Swal.fire(this.up).then((result) => {
          if (result.isConfirmed) {
            this.insertar({roles: this.roles, id: this.form.id}).then(() =>{
              this.$router.push('/configuracion/user')
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      },

      volver(){
        this.limpiarFormulario()
        this.$router.push('/configuracion/user')
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
