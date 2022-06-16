<template>
    <div class="row">
        <div class="col-lg-2">
              <el-select class="select-default"
                  size="large"
                  placeholder="Seleccione Año"
                  v-model="buscar">
                <el-option value="2019">2019</el-option>
                <el-option value="2020">2020</el-option>
                <el-option value="2021">2021</el-option>
                <el-option value="2022">2022</el-option>
              </el-select>
          </div>

          <div class="col-lg-2">
              <el-select class="select-default"
                  size="large"
                  placeholder="Seleccione Mes"
                  v-model="buscar2">
                <el-option value="Marzo">Marzo</el-option>
                <el-option value="Abril">Abril</el-option>
                <el-option value="Mayo">Mayo</el-option>
                <el-option value="Junio">Junio</el-option>
              </el-select>
          </div>

          <div class="col-lg-3">
              <el-select class="select-default"
                  size="large"
                  placeholder="Seleccione Establecimiento"
                  v-model="buscar3">
                <el-option value="JI LAS MARIPOSAS">JI LAS MARIPOSAS</el-option>
                <el-option value="JI BLANCA NIEVES Y LOS 7 ENANITOS">JI BLANCA NIEVES Y LOS 7 ENANITOS</el-option>
                <el-option value="JI BERNARDO OHIGGINS">JI BERNARDO OHIGGINS</el-option>
                <el-option value="OFINA REGIONAL">OFINA REGIONAL</el-option>
              </el-select>
          </div>

          <div class="col-lg-3">
              <el-select class="select-default"
                  size="large"
                  placeholder="Seleccione Nivel"
                  v-model="buscar4">
                <el-option value="SALA CUNA MENOR">SALA CUNA MENOR</el-option>
                <el-option value="SALA CUNA MAYOR">SALA CUNA MAYOR</el-option>
                <el-option value="MEDIO MENOR">MEDIO MENOR</el-option>
                <el-option value="MEDIO MAYOR">MEDIO MAYOR</el-option>
                <el-option value="MEDIOS">MEDIOS</el-option>
                <el-option value="HETEROGENEO">HETEROGENEO</el-option>
              </el-select>
          </div>
          
          <div class="col-md-2 col-sm-12">
            <l-button type="info" wide @click="consultar()">
                <span class="btn-label">
                    <i class="fa fa-send"></i>
                </span>
                Consultar
              </l-button>
          </div>
          <!-- <Agregar /> -->
        </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { Select, Option, DatePicker} from 'element-ui'
import { mapFields } from 'vuex-map-fields';
export default {
    data (){
      return {
        cargando: {
          loading: true,
          fullPage: false,
        }
      }
    },
     components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [DatePicker.name]: DatePicker,
    },
    computed: {
      ...mapState('users', ['load']),
      ...mapFields('users', [ 'buscar']),
    },
     methods: {
      ...mapActions({
          getUsers:   'users/getUsers', // Trae todos los usuarios
          tipoAccion:   'users/cambiarAccion',
          limpiarFormulario: 'users/clearForm',
          loading: 'loading/loading'
      }),

      consultar(){
        console.log("consultar")
      },

      async routeAgregar() {
          this.tipoAccion(1)
          this.loading(this.load)
          this.limpiarFormulario()
          await this.$router.push({ name: 'User Form' })
      },
      search(page) {
        this.loading(this.cargando)
        this.getUsers(page)
      }

      
    },
}
</script>
