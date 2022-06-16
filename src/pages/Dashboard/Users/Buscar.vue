<template>
    <div class="row">
          <div class="col-md-9">
            <fg-input placeholder="Buscar" v-model="buscar" @keyup="search(1)"></fg-input>
          </div>

            <div v-if="permisos.find(item => item.name === 'crear_usuarios')">
              <div class="col-md-2 col-sm-12">
                <l-button type="success" wide @click="routeAgregar()">
                    <span class="btn-label">
                        <i class="fa fa-plus"></i>
                    </span>
                    Agregar
                  </l-button>
              </div>
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
      ...mapState('users', ['load']),
      ...mapState('auth', ['permisos']),
      ...mapFields('users', [ 'buscar']),
    },
     methods: {
      ...mapActions({
          getUsers:   'users/getUsers', // Trae todos los usuarios
          tipoAccion:   'users/cambiarAccion',
          limpiarFormulario: 'users/clearForm',
          loading: 'loading/loading'
      }),

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
