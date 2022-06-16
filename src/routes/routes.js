import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

import DashboardLayout from 'src/pages/Dashboard/Layout/DashboardLayout.vue'
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue'
import User from 'src/pages/Dashboard/Users'
import FormUser from 'src/pages/Dashboard/Users/Form'
import FormAsignarRol from 'src/pages/Dashboard/Users/FormAsignarRol'
import FormRole from 'src/pages/Dashboard/Roles/Form'
import FormAsignarPermisos from 'src/pages/Dashboard/Roles/FormAsignarPermisos'
import FormPermiso from 'src/pages/Dashboard/Permisos/Form'
const Home = () => import('src/pages/Dashboard/Dashboard/Home.vue')
const Login = () => import('src/pages/Auth/Login.vue')
const Role = () => import('src/pages/Dashboard/Roles')
const Permissions = () => import('src/pages/Dashboard/Permisos')

import Indicadores from 'src/pages/Dashboard/Indicadores'

Vue.use(VueRouter);

let configMenu = {
  path: '/configuracion',
  component: DashboardLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'user',
      name: 'Usuarios',
      component: User,
      meta: { requiresAuth: true },
    },
    {
      path: 'user/form',
      name: 'User Form',
      component: FormUser
    },
    {
      path: 'roles',
      name: 'Roles',
      component: Role
    },
    {
      path: 'role/form',
      name: 'Role Form',
      component: FormRole
    },
    {
      path: 'role/form/asignar',
      name: 'Asignar Form',
      component: FormAsignarPermisos
    },
    {
      path: 'user/form/asignar',
      name: 'Asignar Rol',
      component: FormAsignarRol
    },

    {
      path: 'permisos',
      name: 'Permisos',
      component: Permissions
    },
    {
      path: 'permisos/form',
      name: 'Permisos Form',
      component: FormPermiso
    },

  ]
}

let moduloCobertura = {
  path: '/cobertura',
  component: DashboardLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'indicadores',
      name: 'Indicadores',
      component: Indicadores,
      meta: { requiresAuth: true },
    },

  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { guest: true },

}

const routes = [
  loginPage,
  configMenu,
  moduloCobertura,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
    ]
  },

  {path: '*', component: NotFound}
]

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ( store.getters['auth/isAuthenticated']) {
      next();
      return;
    }
    next({ name: 'Login'});
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters['auth/isAuthenticated']) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
