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
//import VueRouter from 'vue-router'
import LightBootstrap from './light-bootstrap-main'
import axios from 'axios'
import store from './store'
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
// Plugins
import App from './App.vue'
// Archivo que gestiona la vida util del token de sesión
require('@/store/subscriber')
// Define la url base del proyecto a nivel global
axios.defaults.baseURL = 'http://localhost:9000/api/v1/'

// router setup
import router from './routes/routes'
Vue.use(LightBootstrap)

store.dispatch('auth/attempt', localStorage.getItem('token'))

/* eslint-disable no-new */
//cierra sesion si ek servidor arroja error 401
axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("logout");
      return router.push("/login");
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  axios
})
