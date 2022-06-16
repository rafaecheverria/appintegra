<template>
    <div>
      <card>
        <Filtro />
      </card>
      <card>
        <Cuadro />
      </card>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Filtro from './Filtro.vue'
import Cuadro from './Cuadro.vue'
export default{
  computed: {
      ...mapState('users', ['title', 'category']),
    },
    components: {
      Filtro,
      Cuadro,
      //Lista,
    },
}
</script>
