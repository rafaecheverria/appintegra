<template>

  <div>
    <fade-render-transition>
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
            <fg-input label="Nombres">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Apellidos">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Email">
            </fg-input>
          </div>
        </div>

        <!-- Fila 2 -->

        <div class="row">
          <div class="col-lg-4">
            <fg-input label="Fecha de Nacimiento">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Género">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input label="Dirección">
            </fg-input>
          </div>
        </div>

        <!-- Fila 3 -->

        <div class="row">
          <div class="col-lg-4">
            <fg-input label="Telefono">
            </fg-input>
          </div>
          <div class="col-lg-4">
             <label>Departamento</label>
              <el-select class="select-default"
                      size="large"
                      placeholder="Seleccionar"
                      v-model="opcion1"
                      multiple>
              <el-option class="select-primary"
                         :value="1"
                         :key="1"> opcion 2
              </el-option>
          </el-select>
          </div>
          <div class="col-lg-4">
             <label>Cargo</label>
              <el-select
                      class="select-default"
                      size="large"
                      placeholder="Seleccionar"
                      v-model="opcion2"
                      multiple>
              <el-option
                      class="select-primary"
                      :value="2"
                      :key="2"> opcion 3
            >
              </el-option>
              </el-select>
          </div>
        </div>

      </div>

      <button type="submit" class="btn btn-info btn-fill pull-right" >Grabar Documento</button>
      <div class="clearfix"></div>

      </card>

    </fade-render-transition>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import { Select, Option} from 'element-ui'
import {FadeRenderTransition} from '@/components/index'

  export default {
    data () {
      return {
      opcion1:'',
      opcion2:'',
      }
    },

    computed: {
      ...mapFields('users', [ 'form.nombres']),
    },

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    FadeRenderTransition,
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
