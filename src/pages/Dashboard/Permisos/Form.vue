<template>

  <div>
    <card>
       <div slot="header">
        <span class="card-title
                     font-weight-normal
                     font-weight-light
                     text-white
                     small
                     text-white">REGISTRAR PERMISO
        </span>
      </div>
      <div class="card-body">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <!-- Fila 1 -->
        <form @submit.prevent='handleSubmit(enviarFormulario)'>

       <div class="row">
          <div class="col-lg-4">
            <ValidationProvider
                    name="permiso"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Permiso"
                      v-model="form.name"
                      data-vv-validate-on="none"
                      :error="failed ? 'el Nombre es un campo requerido': null"
                      :hasSuccess="passed"
                      name="name">
            </fg-input>
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
             <button  v-if="tipoAccion == 1" type="submit" class="btn btn-success btn-fill pull-right">Guardar Permiso</button>
             <button  v-else @click="enviarFormulario()" class="btn btn-info btn-fill pull-right">Actualizar Permiso</button>

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
      ...mapFields('permisos', [ 'form']),
      ...mapState('permisos', ['tipoAccion']),
      ...mapState('alerta', ['up']),
    },

    methods: {
      ...mapActions({
          limpiarFormulario: 'permisos/clearForm',
          loading: 'loading/loading',
          insertar: 'permisos/insertaPermiso',
        }),

     async enviarFormulario() {
        const isValid = await this.$refs.form.validate();
          if (!isValid) {
            return
          }
        this.$refs.form.reset(); //resetea los errores vee-validate
        Swal.fire(this.up).then((result) => {
          if (result.isConfirmed) {
            this.insertar({form: this.form, accion: this.tipoAccion}).then(() =>{
              if(this.tipoAccion !=1)
                this.$router.push('/configuracion/permisos')
              else
                return
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      },

      volver(){
        this.limpiarFormulario()
        this.$router.push('/configuracion/permisos')
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
