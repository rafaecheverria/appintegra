<template>
    <div>
      <card>

        <Estadisticas />
      </card>
    </div>
</template>
<script>
//import { mapState } from 'vuex'
//import {Cabecera} from '@/components/index'
//import Buscador from './Buscar.vue'
import Estadisticas from './Estadisticas.vue'

export default{
  computed: {
      //...mapState('users', ['title', 'category']),
    },
    components: {
      //Buscador,
      //Cabecera,
      Estadisticas,
      //Lista,
    },
}
</script>
