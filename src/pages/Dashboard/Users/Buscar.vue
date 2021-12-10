<template>
    <div class="row">
          <div class="col-md-10">
            <fg-input placeholder="Buscar" v-model="buscar" @keyup="search(1)"></fg-input>
          </div>
          
          <div class="col-md-2 col-sm-12">
            <l-button type="success" wide @click="openDialog()">
                <span class="btn-label">
                    <i class="fa fa-plus"></i>
                </span>
                Agregar
              </l-button>
          </div>
          <Agregar />
        </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import Agregar from './Agregar.vue'

export default {
    components: {
        Agregar
    },
    computed: {
      ...mapState('users', ['dialog']),
      ...mapFields('users', [ 'buscar']),
    },
     methods: {
      ...mapActions({
          getUsers: 'users/getUsers', // Trae todos los usuarios
          openDialog: 'users/openDialog',
          loading: 'users/loading'
      }),

      search(page) {
        this.loading()
        this.getUsers(page)
      }
    },
}
</script>
