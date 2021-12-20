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
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
      ...mapFields('roles', [ 'buscar']),
    },
     methods: {
      ...mapActions({getRoles:'roles/getRoles'}), // Trae todos los roles
      ...mapActions({loading: 'loading/loading'}), // Carga el Load de la tabla

      async routeAgregar() {
          await this.$router.push({ name: 'User Form' })
      },
      search(page) {
        this.loading(true)
        this.getRoles(page)
      }
    },
}
</script>
