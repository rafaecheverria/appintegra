/*!

=========================================================
* Vue Light Bootstrap Dashboard - v1.4.0
=========================================================

* Product Page: http://www.creative-tim.com/product/vue-light-bootstrap-dashboard-pro
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LightBootstrap from './light-bootstrap-main'
import axios from 'axios'
import store from './store'
// Plugins
import App from './App.vue'

// Archivo que gestiona la vida util del token de sesión
require('@/store/subscriber')
// Define la url base del proyecto a nivel global
axios.defaults.baseURL = 'http://localhost:9000/api/v1/'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history',
})

// mantiene la session activa al refrescar la página
store.dispatch('auth/attempt', localStorage.getItem('token'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  axios
})
