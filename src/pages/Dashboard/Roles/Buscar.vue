<template>
    <div class="row">
          <div class="col-md-9">
            <fg-input placeholder="Buscar" v-model="buscar" @keyup="search(1)"></fg-input>
          </div>

          <div class="col-md-3">
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
import { mapActions, mapState} from 'vuex'
import { mapFields } from 'vuex-map-fields'

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
      ...mapState('roles', ['load']),
      ...mapFields('roles', [ 'buscar']),
    },
     methods: {
      ...mapActions({
        getRoles: 'roles/getRoles', // Trae todos los roles
        tipoAccion: 'roles/cambiarAccion', //Cambia la acciòn si edita o agrega
        limpiarFormulario: 'roles/clearForm',
        loading: 'loading/loading', //Icono de carga en la pantalla

      }),
      async routeAgregar() {
        this.tipoAccion(1)
        this.loading(this.load)
        this.limpiarFormulario()
        await this.$router.push({ name: 'Role Form' })
      },
      search(page) {
        this.loading(this.cargando)
        this.getRoles(page)
      }
    },
}
</script>
