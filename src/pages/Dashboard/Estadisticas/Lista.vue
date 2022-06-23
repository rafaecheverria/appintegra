<template>
  <div class="row">
        <div class="col-sm-12">
            <div class="vld-parent">
            <el-table :lazy="false">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Comuna">
                </el-table-column>
                <el-table-column label="JI">
                </el-table-column>
                <el-table-column label="Nivel">
                </el-table-column>
                <el-table-column label="Capacidad">
                </el-table-column>
                <el-table-column label="Matriucla">
                </el-table-column>
                <el-table-column label="vacantes">
                </el-table-column>
                <el-table-column
                label="Actions">
                <template>
                <div class="td-actions">
                  <a v-tooltip.top-center="'Asignar Permisos'" class="btn btn-social btn-success btn-link">
                    <i class="fa fa-cog"></i>
                    </a>
                    <a  v-tooltip.top-center="'Editar Rol'" class="btn btn-social btn-warning btn-link">
                    <i class="fa fa-edit"></i>
                    </a>
                    <a v-tooltip.top-center="'Eliminar Rol'" class="btn btn-social btn-danger btn-link">
                    <i class="fa fa-close"></i>
                    </a>
                </div>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
  import {Table, TableColumn} from 'element-ui'

  export default {

  components: {
     [Table.name]: Table,
     [TableColumn.name]: TableColumn,
    },
  }


</script>
