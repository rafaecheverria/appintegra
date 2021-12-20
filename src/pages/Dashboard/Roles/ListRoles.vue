<template>
     <div class="row">
        <div class="col-sm-12">
            <div class="vld-parent">
            <el-table :lazy="false" :data="rolesState.data" :emptyText="vacio">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name"
                                label="Name">
                </el-table-column>
                <el-table-column
                label="Actions">
                <div class="td-actions">
                    <a v-tooltip.top-center="'View Profile'" class="btn btn-info btn-link btn-xs" href="#">
                    <i class="fa fa-user"></i>
                    </a>
                    <a v-tooltip.top-center="'Edit Profile'" class="btn btn-warning btn-link btn-xs">
                    <i class="fa fa-edit"></i>
                    </a>
                    <a v-tooltip.top-center="'Delete'" class="btn btn-danger btn-link btn-xs">
                    <i class="fa fa-close"></i>
                    </a>
                </div>
                </el-table-column>
            </el-table>

            <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                </div>
                <div class="card-body">
                    <l-paginacion class="pagination" module="roles" collection="getRoles" estado="rolesState"/>
                </div>
            </div>
            <Load />
            </div>
        </div>
    </div>
</template>

<script>
import {Table, TableColumn} from 'element-ui'
import { mapActions, mapState } from 'vuex'
import {Paginacion as LPaginacion} from 'src/components/index'
import {Load} from 'src/components/index'
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
      ...mapState('roles', ['rolesState', 'pagination', 'loading']),
    },
     methods: {
      ...mapActions({
          getRoles: 'roles/getRoles', // Trae todos los usuarios
      }),
    },
  mounted () {
        this.getRoles(this.pagination.current_page);
      },
}
</script>
