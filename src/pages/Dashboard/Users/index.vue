<template>
    <div>
      <card>
        <Cabecera :title="title" :category="category" />
        <Buscador />
        <Lista />
      </card>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import {Cabecera} from '@/components/index'
import Buscador from './Buscar.vue'
import Lista from './ListUsers.vue'
export default{
  computed: {
      ...mapState('users', ['title', 'category']),
    },
    components: {
      Buscador,
      Cabecera,
      Lista,
    },
}
</script>
