<template>
    <ul class="pagination">
        <li class="page-item" v-if="pagination.current_page > 1">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page - 1, buscar)">«</a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" disabled="disabled">«</a>
        </li>
        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, buscar)" v-text="page"></a>
        </li>
        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page + 1, buscar)">»</a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" disabled="disabled">»</a>
        </li>
    </ul>
</template>
<script>
import { mapState } from 'vuex'

  export default{
    name: 'l-paginacion',

    props:['module', 'collection'],

    computed: {
      ...mapState('users', ['pagination', 'offset', 'loading', 'buscar']),
      
      isActived: function(){
        return this.pagination.current_page;
      },
      //Calcula los elementos de la paginación
      pagesNumber: function() {
          if(!this.pagination.to) {
              return [];
          }
          
          var from = this.pagination.current_page - this.offset; 
          if(from < 1) {
              from = 1;
          }

          var to = from + (this.offset * 2); 
          if(to >= this.pagination.last_page){
              to = this.pagination.last_page;
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
            console.log(page)
            this.pagination.current_page = page;
            this.$store.dispatch(this.module+'/'+this.collection, this.pagination.current_page);
            this.$store.dispatch(this.module+'/'+'loading');
            
            //this.$store.state.users.this.loading === true;
        },
    },
  }  
</script>
