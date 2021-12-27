<template>

  <div>
    <card>
       <div slot="header">
        <span class="card-title
                     font-weight-normal
                     font-weight-light
                     text-white
                     small
                     text-white">REGISTRAR USUARIO</span>
      </div>
      <div class="card-body">
    <ValidationObserver v-slot="{ handleSubmit }">
        <!-- Fila 1 -->
      <form @submit.prevent="handleSubmit(agregarUsuario)">
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
                      :hasSuccess="passed">
            </fg-input>
            </ValidationProvider>
          </div>
          <div class="col-lg-4">
             <ValidationProvider
                    name="email"
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
                      :error="failed ? 'el Email es un campo requerido': null"
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
                        :value="region.id"
                        :label="region.nombre"
                        :key="region.id">
                  </el-option>
                </el-select>
                <span>Error</span>
          </div>
        </div>

        <!-- Fila 4 -->

        <div class="row">
          <div class="col-lg-6">
             <label>Departamento</label>
              <el-select class="select-default"
                      size="large"
                      placeholder="Seleccionar"
                      v-model="form.departamento_id"
                      noDataText="Sin Datos"
                      filterable
                      noMatchText="No encontrado"
                      >
              <el-option v-for="departamento in selectDeptoReg"
                        class="select-primary"
                        :value="departamento.id"
                        :label="departamento.departamento"
                        :key="departamento.id">
              </el-option>
          </el-select>
          </div>
          <div class="col-lg-6">
             <label>Cargo</label>
              <el-select
                      class="select-default"
                      size="large"
                      placeholder="Seleccionar"
                      v-model="form.cargo_id"
                      noDataText="Sin Datos"
                      filterable
                      noMatchText="No encontrado"
                      >
              <el-option v-for="cargo in selectCargo"
                      class="select-primary"
                      :value="cargo.id"
                      :label="cargo.nombre"
                      :key="cargo.id">

              </el-option>
              </el-select>
          </div>
        </div>
          <br>
          <l-button @click="$router.push('/configuracion/user')" type="default">
            <span class="btn-label">
                <i class="fa fa-arrow-left"></i>
            </span>
            Volver
          </l-button>
          <button type="submit" class="btn btn-success btn-fill pull-right">Guardar Usuario</button>
          <div class="clearfix"></div>

      </form>
      </ValidationObserver>
      </div>
     </card>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import { Select, Option, DatePicker} from 'element-ui'
import { extend} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import Swal from 'sweetalert2'
import { rutValidator } from "vue-dni"

extend("email", email);
extend("required", required);
extend("rut", rutValidator);

  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [DatePicker.name]: DatePicker,
    },
    computed: {
      ...mapFields('users', [ 'form']),
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
          addUser: 'users/addUser',
      }),

      agregarUsuario() {
        console.log("hol")
          Swal.fire(this.up).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  this.down.guardado,
                  this.down.descripcion,
                  this.down.tipo
                )
                this.addUser(this.form)
              }
            })

      },
    },

    mounted () {
        this.selectRegiones();
        this.selectCargos();
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
