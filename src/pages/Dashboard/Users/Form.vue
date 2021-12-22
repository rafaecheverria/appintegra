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

        <!-- Fila 1 -->

        <div class="row">
          <div class="col-lg-4">
            <fg-input label="Rut"
                      v-model="form.rut">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Nombres"
                      v-model="form.nombres">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Apellidos"
                      v-model="form.apellidos">
            </fg-input>
          </div>
        </div>

        <!-- Fila 2 -->

        <div class="row">
          <div class="col-lg-4">
            <fg-input label="Email"
                      v-model="form.email">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Fecha de Nacimiento"
                       v-model="form.fecha_nacimiento">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Género"
                       v-model="form.genero">
            </fg-input>
          </div>
        </div>

        <!-- Fila 3 -->

        <div class="row">
          <div class="col-lg-8">
            <fg-input label="Dirección"
                      v-model="form.direccion">
            </fg-input>
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

      </div>

      <button type="submit" class="btn btn-info btn-fill pull-right" @click="agregarUsuario()" >Guardar Usuario</button>
      <div class="clearfix"></div>

      </card>

  </div>

</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import { Select, Option} from 'element-ui'

  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
    },
    computed: {
      ...mapFields('users', [ 'form']),
      ...mapState('regiones', ['selectRegion']),
      ...mapState('departamentos', ['selectDeptoReg']),
      ...mapState('cargos', ['selectCargo']),
    },

    methods: {
      ...mapActions({
          selectRegiones: 'regiones/selectRegion', // Trae todas las regiones
          selectDepartamentos: 'departamentos/changeRegion',
          selectCargos: 'cargos/selectCargo',
          addUser: 'users/addUser',
      }),

      agregarUsuario() {
        this.addUser(this.form)
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
