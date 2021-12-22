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
    computed: {
      ...mapState('users', ['dialog']),
      ...mapFields('users', [ 'buscar']),
    },
     methods: {
      ...mapActions({
          getUsers:   'users/getUsers', // Trae todos los usuarios
          openDialog: 'users/openDialog',
      }),
      ...mapActions({loading: 'loading/loading'}),

      async routeAgregar() {
          let load = {loading: false, fullPage: false}
          this.loading(load)
          await this.$router.push({ name: 'User Form' })
      },
      search(page) {
        this.loading(true)
        this.getUsers(page)
      }
    },
}
</script>
