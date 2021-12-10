<template>
    <div>
      <card>
        <Header />
        <Buscador />
        <Lista />
      </card>  
    </div>
</template>
<script>
import Header from './Cabacera.vue'
import Buscador from './Buscar.vue'
import Lista from './ListUsers.vue'
export default{
    components: {
      Buscador,
      Header,
      Lista,
    },
}
</script>
