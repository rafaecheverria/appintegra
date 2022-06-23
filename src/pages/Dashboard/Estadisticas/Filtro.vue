<template>
    <div class="row">
         <div class="col-lg-2">
            <fg-input>
              <el-date-picker
                v-model="filtros.fecha"
                type="month"
                placeholder="Seleccione Año"
                >
              </el-date-picker>
            </fg-input>
          </div>

          <div class="col-lg-3">
              <el-select class="select-default"
                  size="large"
                  placeholder="Seleccione Establecimiento"
                  v-model="filtros.jardin">
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
                  v-model="filtros.nivel">
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
import { Select, Option, DatePicker} from 'element-ui'
import { mapFields } from 'vuex-map-fields';
export default {
      components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [DatePicker.name]: DatePicker,
      },
    data (){
      return {
        cargando: {
          loading: true,
          fullPage: false,
          datepicker:'',
        }
      }
    },

    computed: {
      ...mapFields('estadisticas', [ 'filtros']),
    },
     methods: {
      consultar(){
        console.log(this.filtros.fecha)
      },

    },
}
</script>
