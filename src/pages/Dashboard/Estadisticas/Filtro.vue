<template>
    <div class="row">
         <div class="col-lg-2">
            <fg-input>
              <el-date-picker
                v-model="filtros.fecha"
                format="MM-yyyy"
                type="month"
                placeholder="Seleccione Año"
                >
              </el-date-picker>
            </fg-input>
          </div>

           <div class="col-lg-3">
             <ValidationProvider
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select class="select-default"
                          size="large"
                          placeholder="Seleccione Jadín"
                          v-model="filtros.jardin"
                          noDataText="Sin Datos"
                          filterable
                          noMatchText="No encontrado"
                          >
              <el-option v-for="departamento in selectDeptoFiltros"
                        class="select-primary"
                        :error="failed ? 'Departamento es un campo requerido': null"
                        :value="departamento.id"
                        :label="departamento.departamento"
                        :key="departamento.id">
              </el-option>
          </el-select>
          <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Jardín es un campo requerido': null }} </div>
          </ValidationProvider>
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
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
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
        }
      }
    },

    computed: {
      ...mapFields('estadisticas', [ 'filtros']),
      ...mapState('departamentos', ['selectDeptoFiltros']),
      mes() {
        return moment(this.filtros.fecha, 'M-YY').month()+1
      },
      ano() {
        return moment(this.filtros.fecha, 'M-YY').year()
      }
    },
     methods: {
      ...mapActions({
          selectDepartamentosFiltro: 'departamentos/DeptoFiltros',
        }),
      consultar(){
        console.log(this.mes)
      },
    },
     mounted () {
      this.selectDepartamentosFiltro()
      },
}
</script>