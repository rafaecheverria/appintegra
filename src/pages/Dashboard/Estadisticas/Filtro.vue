<template>
    <div class="row">
         <div class="col-lg-2">
          
          <label>Mes/Año</label>
            <fg-input>
              <ValidationProvider
                name="mes"
                rules="required"
                v-slot="{ passed, failed }"
              >
              <el-date-picker
                v-model="filtros.fecha"
                format="MM-yyyy"
                type="month"
                placeholder="Seleccione Mes y Año"
                :error="failed ? 'Mes es un campo requerido': null"
                :hasSuccess="passed"
                >
              >
              </el-date-picker>
              <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Mes/Año es un campo requerido': null }} </div>
            </ValidationProvider>
            </fg-input>
          
          </div>

           <div class="col-lg-3">
            <label>Jardín Infantil</label>
             <ValidationProvider
                    rules="required"
                    v-slot="{ failed , passed}"
                  >
              <el-select class="select-default"
                          size="large"
                          placeholder="Seleccionar Jadín"
                          v-model="filtros.departamento_id"
                          v-on:change="selectJornadas($event)"
                          noDataText="Sin Datos"
                          filterable
                          noMatchText="No encontrado"
                          >

               <el-option v-for="departamento in selectDeptoFiltros"
                        class="select-primary"
                        :error="failed ? 'Jardin es un campo requerido': null"
                        :hasSuccess="passed"
                        :value="departamento.id"
                        :label="departamento.departamento"
                        :key="departamento.id">
              </el-option>
          </el-select>
          <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Jardín es un campo requerido': null }} </div>
          </ValidationProvider>
          </div>

           <div class="col-lg-3">
            <label>Jornada</label>
             <ValidationProvider
                    rules="required"
                    v-slot="{ failed }"
                  >
              <el-select class="select-default"
                          size="large"
                          placeholder="Seleccionar Jornada"
                          v-model="filtros.jornada_id"
                          noDataText="Sin Datos"
                          filterable
                          noMatchText="No encontrado"
                          >
              <el-option v-for="jornada in selectJornadasDepto"
                        class="select-primary"
                        :error="failed ? 'Jornada es un campo requerido': null"
                        :value="jornada.id"
                        :label="jornada.jornada"
                        :key="jornada.id">
              </el-option>
          </el-select>
          <div class="text-danger invalid-feedback" style="display: block;"> {{ failed ? 'Jornada es un campo requerido': null }} </div>
          </ValidationProvider>
          </div>

          <div class="col-lg-2 col-sm-12">
            <label></label>
            <l-button type="info" wide @click="consultarJardin()">
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
      ...mapState('estadisticas', ['filtros', 'selectJornadasDepto']),
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
          selectJornadas: 'estadisticas/changeDepto',
          limpiarFormulario: 'estadisticas/clearForm',
          filtrarBusqueda: 'estadisticas/filtrarBusqueda'
         // consultar: 'estadisticas/consultar'
        }),
        consultarJardin(){
          this.filtrarBusqueda( this.filtros );
        }
    },

     mounted () {
      this.selectDepartamentosFiltro()
      this.limpiarFormulario()
      },
}
</script>