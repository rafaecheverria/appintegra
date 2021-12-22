<template>
    <ul class="pagination">
        <li class="page-item" v-if="$store.state[modulo].pagination.current_page > 1">
            <a class="page-link" href="#" @click.prevent="cambiarPagina($store.state[modulo].pagination.current_page - 1, $store.state[modulo].buscar)">«</a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" disabled="disabled">«</a>
        </li>
        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, $store.state[modulo].buscar)" v-text="page"></a>
        </li>
        <li class="page-item" v-if="$store.state[modulo].pagination.current_page < $store.state[modulo].pagination.last_page">
            <a class="page-link" href="#" @click.prevent="cambiarPagina($store.state[modulo].pagination.current_page + 1, $store.state[modulo].buscar)">»</a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" disabled="disabled">»</a>
        </li>
    </ul>
</template>
<script>

  export default{
    name: 'l-paginacion',

    props:['module', 'collection'],

    data () {
      return {
        modulo: this.module,
        load: {
            loading: true,
            fullPage: false
        }
      }
    },

    computed: {

      isActived: function(){
        return this.$store.state[this.module].pagination.current_page
      },
      //Calcula los elementos de la paginación
      pagesNumber: function() {
          if(!this.$store.state[this.module].pagination.to) {
              return [];
          }

          var from = this.$store.state[this.module].pagination.current_page - this.$store.state[this.module].offset;
          if(from < 1) {
              from = 1;
          }

          var to = from + (this.$store.state[this.module].offset * 2);
          if(to >= this.$store.state[this.module].pagination.last_page){
              to = this.$store.state[this.module].pagination.last_page;
          }

          var pagesArray = [];
          while(from <= to) {
              pagesArray.push(from);
              from++;
          }
          return pagesArray;
      }
    },
    methods: {
        cambiarPagina(page){
            this.$store.state[this.module].pagination.current_page = page;
            this.$store.dispatch(this.module+'/'+this.collection, this.$store.state[this.module].pagination.current_page);
            this.$store.dispatch('loading/loading', this.load);
        },
    },
  }
</script>
