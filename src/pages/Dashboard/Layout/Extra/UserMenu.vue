<template>
  <div class="user">
    <div class="photo">
      <img src="/static/img/default-avatar.png" alt="avatar"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" href="#">
           <span>
             {{title}}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <slot>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">Mi Perfil</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Editar Perfil</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">A</span>
                  <span class="sidebar-normal">Ajustes</span>
                </a>
              </li>
            </slot>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    props: {
      title: {
        type: String,
        default: 'Rafael Echeverria'
      }
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
