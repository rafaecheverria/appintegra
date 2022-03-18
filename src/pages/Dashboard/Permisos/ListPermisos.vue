<template>
     <div class="row">
        <div class="col-sm-12">
            <div class="vld-parent">
            <el-table :lazy="false" :data="permisosState.data" :emptyText="vacio">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name"
                                label="Name">
                </el-table-column>
                <el-table-column
                label="Actions">
                <template slot-scope="props">
                  <div class="td-actions">
                      <a v-tooltip.top-center="'Edit Profile'" class="btn btn-social btn-warning btn-link">
                      <i class="fa fa-edit" @click="obtenerPermiso( props.row.id)"></i>
                      </a>
                      <a v-tooltip.top-center="'Delete'" class="btn btn-social btn-danger btn-link">
                      <i class="fa fa-close" @click="deletePermiso( props.row.id)"></i>
                      </a>
                  </div>
                </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                </div>
                <div class="card-body">
                    <l-paginacion class="pagination" module="permisos" collection="getPermisos" estado="permisosState"/>
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
import Swal from 'sweetalert2'

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
      ...mapState('permisos', ['permisosState', 'pagination']),
      ...mapState('alerta', ['delete']),
    },
     methods: {
      ...mapActions({
          getPermisos: 'permisos/getPermisos', // Trae todos los usuarios
          getPermiso: 'permisos/getPermiso',// trae 1 Rol para editar
          cambiarAccion: 'permisos/cambiarAccion',// Cambia la accion del boton agregar o actualizar en el form usuario
          eliminarPermiso: 'permisos/eliminarPermiso'
      }),

      obtenerPermiso(id){
        this.cambiarAccion(2) //activa el boton actualizar usuario
        this.getPermiso(id)
        this.$router.push('/configuracion/permisos/form')
      },

      deletePermiso(id){
        Swal.fire(this.delete).then((result) => {
          if (result.isConfirmed) {
            this.eliminarPermiso(id)
          }
        })
      }
    },
  mounted () {
        this.getPermisos(this.pagination.current_page);
      },
}
</script>
