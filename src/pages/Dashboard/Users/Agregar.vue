<template>
    
          <el-dialog
            @close="closeDialog()"
            center
            title="Custom Content"
            :visible="dialog">

            <span>Formlario para agregar un usuario</span>

            <span slot="footer" class="dialog-footer">
              <button class="btn btn-danger" @click="closeDialog('centered')">Cancelar</button>&nbsp;
              <button class="btn btn-success" @click="closeModal('centered')">Agregar</button>
            </span>

          </el-dialog>

</template>
<script>
import { Dialog } from 'element-ui'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
      [Dialog.name]: Dialog,
    },
    computed: {
      ...mapState('users', ['dialog']),
    },
    methods: {
      ...mapActions({
          closeDialog: 'users/closeDialog', // Trae todos los usuarios
      }),
    },
}
</script>