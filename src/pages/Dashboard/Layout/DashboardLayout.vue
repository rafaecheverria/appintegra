<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar>
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item :link="{name: 'Inicio', icon: 'nc-icon nc-chart-pie-35', path: '/login'}">
        </sidebar-item>

        <sidebar-item :link="{name: 'Cobertura', icon: 'nc-icon nc-settings-gear-64'}">
          <sidebar-item :link="{name: 'Indicadores', path: '/cobertura/indicadores'}"></sidebar-item>
          <sidebar-item :link="{name: 'Transporte', path: '#'}"></sidebar-item>
          <sidebar-item :link="{name: 'Mitigaciones', path: '#'}"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{name: 'Configuración', icon: 'nc-icon nc-settings-gear-64'}">
          <sidebar-item :link="{name: 'Usuarios', path: '/configuracion/user'}"></sidebar-item>
          <sidebar-item :link="{name: 'Roles', path: '/configuracion/roles'}"></sidebar-item>
          <sidebar-item :link="{name: 'Permisos', path: '/configuracion/permisos'}"></sidebar-item>
        </sidebar-item>

      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './Extra/MobileMenu.vue'
  import UserMenu from './Extra/UserMenu.vue'
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      UserMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      initScrollbar() {
        let docClasses = document.body.classList;
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('main-panel');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      }
    },
    mounted() {
      this.initScrollbar()
    }
  }

</script>
