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
                <template slot-scope="props">
                <div class="td-actions">
                  <a @click="'#'" v-tooltip.top-center="'Asignar Permisos'" class="btn btn-social btn-success btn-link">
                    <i class="fa fa-cog"></i>
                    </a>
                    <a  @click="obtenerRole( props.row.id)" v-tooltip.top-center="'Editar Rol'" class="btn btn-social btn-warning btn-link">
                    <i class="fa fa-edit"></i>
                    </a>
                    <a @click="eliminarRole( props.row.id)" v-tooltip.top-center="'Eliminar Rol'" class="btn btn-social btn-danger btn-link">
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
      ...mapState('roles', ['rolesState', 'pagination']),
      ...mapState('alerta', ['delete']),
    },
     methods: {
      ...mapActions({
          getRoles: 'roles/getRoles', // Trae todos los usuarios
          getRole: 'roles/getRole',// trae 1 Rol para editar
          cambiarAccion: 'roles/cambiarAccion',// Cambia la accion del boton agregar o actualizar en el form usuario
          eliminarRol: 'roles/eliminarRol'
      }),

      obtenerRole(id){
        this.cambiarAccion(2) //activa el boton actualizar usuario
        this.getRole(id)
        this.$router.push('/configuracion/role/form')
      },

      eliminarRole(id){
        Swal.fire(this.delete).then((result) => {
          if (result.isConfirmed) {
            this.eliminarRol(id)
          }
        })
      }

    },
  mounted () {
        this.getRoles(this.pagination.current_page);
      },
}
</script>
