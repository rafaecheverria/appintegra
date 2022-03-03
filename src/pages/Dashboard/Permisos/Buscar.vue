<template>
    <div class="row">
          <div class="col-md-10">
            <fg-input placeholder="Buscar" v-model="buscar" @keyup="search(1)"></fg-input>
          </div>

          <div class="col-md-2 col-sm-12">
            <l-button type="success" wide @click="routeAgregar()">
                <span class="btn-label">
                    <i class="fa fa-plus"></i>
                </span>
                Agregar
              </l-button>
          </div>
          <!-- <Agregar /> -->
        </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
    computed: {
      ...mapState('permisos', ['load']),
      ...mapFields('permisos', [ 'buscar']),
    },
     methods: {
      ...mapActions({
        getPermisos:'permisos/getPermisos',// Trae todos los permisos
        tipoAccion: 'permisos/cambiarAccion', //Cambia la acciòn si edita o agrega
        limpiarFormulario: 'permisos/clearForm',
        loading: 'loading/loading'// Carga el Load de la tabla
        }),

      async routeAgregar() {
        this.tipoAccion(1)
        this.loading(this.load)
        this.limpiarFormulario()
        await this.$router.push({ name: 'Permisos Form' })
      },
      search(page) {
        this.loading(this.cargando)
        this.getPermisos(page)
      }
    },
}
</script>
