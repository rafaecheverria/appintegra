<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="vld-parent">
            <el-table :lazy="false" :data="usersState.data" :emptyText="vacio">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="nombres"
                                label="Nombres">
                </el-table-column>
                <el-table-column prop="apellidos"
                                label="Apellidos">
                </el-table-column>
                <el-table-column prop="email"
                                label="Email">
                </el-table-column>
                <el-table-column
                label="Acciones">
                <template slot-scope="props">
                <div class="td-actions">
                    <a v-tooltip.top-center="'View Profile'" class="btn btn-info btn-link btn-xs" href="#">
                    <i class="fa fa-user"></i>
                    </a>
                    <a v-tooltip.top-center="'Edit Profile'" class="btn btn-warning btn-link btn-xs">
                    <i class="fa fa-edit" @click="obtenerUser( props.row.id)"></i>
                    </a>
                    <a v-tooltip.top-center="'Delete'" class="btn btn-danger btn-link btn-xs">
                    <i class="fa fa-close"></i>
                    </a>
                </div>
                </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                </div>
                <div class="card-body">
                    <l-paginacion class="pagination" module="users" collection="getUsers" estado="usersState"/>
                </div>
            </div>
            <Load />
            </div>
        </div>
    </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { Paginacion as LPaginacion } from 'src/components/index'
import { Load } from 'src/components/index'
export default {
    data() {
      return {
          vacio: "Sin información"
      }
    },
    components: {
      Load,
      LPaginacion,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
    },
    computed: {
      ...mapState('users', ['usersState', 'pagination']),
    },
     methods: {
      ...mapActions({
          getUsers: 'users/getUsers', // Trae todos los usuarios
          getUser: 'users/getUser' //Trae 1 usuario para editar
      }),

      obtenerUser(id)
      {
         this.getUser(id)
      }
    },

    mounted () {
        this.getUsers(this.pagination.current_page);
      },
}
</script>
