<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="vld-parent">
            <el-table :lazy="false" :data="usersState.data" :emptyText="vacio">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="nombres"
                                label="Nombres"
                                >
                </el-table-column>
                <el-table-column prop="apellidos"
                                label="Apellidos">
                </el-table-column>
                <el-table-column prop="email"
                                label="Email">
                </el-table-column>
                <el-table-column
                >
                <template slot-scope="props">
                <div class="td-actions">
                    <a @click="obtenerRolUsuario( props.row.id)" v-tooltip.top-center="'Roles de Usuario'" class="btn btn-social btn-info btn-link" href="#">
                      <i class="fa fa-user"></i>
                    </a>

                    <a @click="obtenerUser( props.row.id)" v-tooltip.top-center="'Editar Usuario'" class="btn btn-social btn-warning btn-link">
                      <i class="fa fa-edit"></i>
                    </a>

                    <a @click="eliminarUsuario( props.row.id)" v-tooltip.top-center="'Eliminar Usuario'" class="btn btn-social btn-danger btn-link">
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
      ...mapState('users', ['usersState', 'pagination']),
      ...mapState('alerta', ['delete']),
    },
     methods: {
      ...mapActions({
          getUsers: 'users/getUsers', // Trae todos los usuarios
          getUser: 'users/getUser', //Trae 1 usuario para editar
          cambiarAccion: 'users/cambiarAccion', // Cambia la accion del boton agregar o actualizar en el form usuario
          eliminarUser: 'users/eliminarUsuario',
          getRolUsuario: 'users/obtenerRoles'
      }),

       obtenerUser(id){
        this.cambiarAccion(2) //activa el boton actualizar usuario
        this.getUser(id)
        this.$router.push('/configuracion/user/form')
      },

      obtenerRolUsuario(id){
        this.getRolUsuario(id)
        this.$router.push('/configuracion/user/form/asignar')
      },

      eliminarUsuario(id){
        Swal.fire(this.delete).then((result) => {
          if (result.isConfirmed) {
            this.eliminarUser(id)
          }
        })
      }

    },

    mounted () {
        this.getUsers(this.pagination.current_page);
      },
}
</script>
