<template>

   <loading :active="loading"
                :is-full-page="fullPage"
                loader = "dots"
                :width= "64"
                color="#00b4d8"
                />
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'load',
  components: {
      Loading,
    },

    computed: {
      ...mapState('loading', ['loading', 'fullPage']),

    },

}
</script>
