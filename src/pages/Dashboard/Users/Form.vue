<template>

  <div>
    <card>
       <div slot="header">
        <span class="card-title
                     font-weight-normal
                     font-weight-light
                     text-white
                     small
                     text-white">REGISTRAR USUARIO
        </span>
      </div>
      <div class="card-body">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <!-- Fila 1 -->
      <form @submit.prevent='handleSubmit(enviarFormulario)'>
       <div class="row">
          <div class="col-lg-4">
            <ValidationProvider
                    name="rut"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Rut"
                      v-model="form.rut"
                      data-vv-validate-on="none"
                      :error="failed ? 'el Rut es un campo requerido': null"
                      :hasSuccess="passed"
                      :disabled="tipoAccion != 1"
                      name="rut">
            </fg-input>
            </ValidationProvider>
          </div>
          <div class="col-lg-4">
             <ValidationProvider
                    name="nombres"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Nombres"
                      v-model="form.nombres"
                      data-vv-validate-on="none"
                      :error="failed ? 'Nombres es un campo requerido': null"
                      :hasSuccess="passed">
            </fg-input>
            </ValidationProvider>
          </div>
          <div class="col-lg-4">
            <ValidationProvider
                    name="apellidos"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Apellidos"
                      v-model="form.apellidos"
                      data-vv-validate-on="none"
                      :error="failed ? 'Apellidos es un campo requerido': null"
                      :hasSuccess="passed">
            </fg-input>
            </ValidationProvider>
          </div>
        </div>

        <!-- Fila 2 -->

        <div class="row">
          <div class="col-lg-4">
            <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Email"
                      type= "email"
                      data-vv-validate-on="none"
                      :error="failed ? 'Email es un campo requerido': null"
                      :hasSuccess="passed"
                      v-model="form.email">
            </fg-input>
            {{failed[0]}}
            </ValidationProvider>
          </div>
          <div class="col-md-4">
            <ValidationProvider
                    name="fecha_nacimiento"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input
                  label="Fecha de Nacimiento"
                  data-vv-validate-on="none"
                  :error="failed ? 'Fecha Nacimiento es un campo requerido': null"
                  :hasSuccess="passed">
                <el-date-picker v-model="form.fecha_nacimiento"
                                format="dd-MM-yyyy"
                                type="date"
                                placeholder="dd-mm-yyyy"
                               >
                </el-date-picker>
            </fg-input>
            </ValidationProvider>
          </div>
          <div class="col-lg-4">
            <ValidationProvider
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Género"
                      v-model="form.genero"
                      :error="failed ? 'Género es un campo requerido': null"
                      :hasSuccess="passed">
            </fg-input>
            </ValidationProvider>
          </div>
        </div>

        <!-- Fila 3 -->

        <div class="row">
          <div class="col-lg-8">
             <ValidationProvider
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
            <fg-input label="Dirección"
                      v-model="form.direccion"
                      data-vv-validate-on="none"
                      :error="failed ? 'Dirección es un campo requerido': null"
                      :hasSuccess="passed">
            </fg-input>
            </ValidationProvider>
          </div>
           <div class="col-lg-4">
             <label>Región</label>
          <ValidationProvider
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
          <el-select class="select-default"
                      size="large"
                      placeholder="Seleccionar Región"
                      v-model="form.region_id"
                      v-on:change="selectDepartamentos($event)"
                      noDataText="Sin Datos"
                      filterable
                      noMatchText="No encontrado"
                        >
                  <el-option v-for="region in selectRegion"
                        class="select-primary"
                        data-vv-validate-on="none"
                        :error="failed ? 'Región es un campo requerido': null"
                        :hasSuccess="passed"
                        :value="region.id"
                        :label="region.nombre"
                        :key="region.id">
                  </el-option>
                </el-select>
                <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Región es un campo requerido': null }} </div>
                 </ValidationProvider>
          </div>
        </div>

        <!-- Fila 4 -->

        <div class="row">
          <div class="col-lg-6">
             <label>Departamento</label>
             <ValidationProvider
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select class="select-default"
                          size="large"
                          placeholder="Seleccionar"
                          v-model="form.departamento_id"
                          noDataText="Sin Datos"
                          filterable
                          noMatchText="No encontrado"
                          >
              <el-option
                      class="select-primary"
                      value=""
                      label="Seleccionar"
                      >
              </el-option>
              <el-option v-for="departamento in selectDeptoReg"
                        class="select-primary"
                        :error="failed ? 'Departamento es un campo requerido': null"
                        :value="departamento.id"
                        :label="departamento.departamento"
                        :key="departamento.id">
              </el-option>
          </el-select>
          <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Departamento es un campo requerido': null }} </div>
          </ValidationProvider>
          </div>
          <div class="col-lg-6">
            <label>Cargo</label>
             <ValidationProvider
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select
                      class="select-default"
                      size="large"
                      placeholder="Seleccionar"
                      v-model="form.cargo_id"
                      noDataText="Sin Datos"
                      filterable
                      noMatchText="No encontrado"
                      >
              <el-option
                      class="select-primary"
                      value=""
                      label="Seleccionar"
                      >
              </el-option>
              <el-option v-for="cargo in selectCargo"
                      class="select-primary"
                      :value="cargo.id"
                      :label="cargo.nombre"
                      :key="cargo.id">
              </el-option>
              </el-select>
              <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Cargo es un campo requerido': null }} </div>
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
             <button  v-if="tipoAccion == 1" type="submit" class="btn btn-success btn-fill pull-right">Guardar Usuario</button>
             <button  v-else @click="enviarFormulario()" class="btn btn-info btn-fill pull-right">Actualizar Usuario</button>

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
import  { Load }  from 'src/components/index'
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
      ...mapFields('users', [ 'form']),
      ...mapState('users', ['tipoAccion']),
      ...mapState('regiones', ['selectRegion']),
      ...mapState('departamentos', ['selectDeptoReg']),
      ...mapState('cargos', ['selectCargo']),
      ...mapState('alerta', ['up', 'down']),
    },

    methods: {
      ...mapActions({
          selectRegiones: 'regiones/selectRegion', // Trae todas las regiones
          selectDepartamentos: 'departamentos/changeRegion',
          selectCargos: 'cargos/selectCargo',
          insertaUsuario: 'users/insertaUsuario',
          limpiarFormulario: 'users/clearForm',
          loading: 'loading/loading',
          insertar: 'users/insertaUsuario',
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
                this.$router.push('/configuracion/user')
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
        this.$router.push('/configuracion/user')
      }
    },

    mounted () {
      this.loading(false)
      this.selectRegiones()
      this.selectCargos()
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
