// Middleware
import middleware from './middleware'

import DashboardLayout from 'src/pages/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue'
// Dashboard pages
//import Overview from 'src/pages/Dashboard/Dashboard/Overview.vue'
import Stats from 'src/pages/Dashboard/Dashboard/Stats.vue'

// Pages
import User from 'src/pages/Dashboard/Users'
import FormUser from 'src/pages/Dashboard/Users/Form'
import Login from 'src/pages/Auth/Login.vue'

//Role
import FormRole from 'src/pages/Dashboard/Roles/Form'
import FormAsignarRole from 'src/pages/Dashboard/Roles/FormAsignarRole'

import FormPermiso from 'src/pages/Dashboard/Permisos/Form'

// Nuevos componentes
const Users = () => import('src/pages/Dashboard/Users')
const Home = () => import('src/pages/Dashboard/Dashboard/Home.vue')
const Role = () => import('src/pages/Dashboard/Roles')
const Permissions = () => import('src/pages/Dashboard/Permisos')

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
    },
    {
      path: 'grid-system',
      name: 'Grid System',
    },
    {
      path: 'panels',
      name: 'Panels',
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
    },
    {
      path: 'notifications',
      name: 'Notifications',
    },
    {
      path: 'icons',
      name: 'Icons',
    },
    {
      path: 'typography',
      name: 'Typography',
    }

  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
    },
    {
      path: 'extended',
      name: 'Extended Forms',
    },
    {
      path: 'validation',
      name: 'Validation Forms',
    },
    {
      path: 'wizard',
      name: 'Wizard',
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
    },
    {
      path: 'extended',
      name: 'Extended Tables',
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
    }]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  //redirect: '/pages/user',
  children: [
    {
      path: 'timeline',
      name: 'Timeline Page',
    },
    {
      path: 'users',
      name: 'users',
      component: Users
    }
  ]
}

let configMenu = {
  path: '/configuracion',
  component: DashboardLayout,
  beforeEnter: middleware.user,
  //redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'Usuarios',
      component: User
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
      component: FormAsignarRole
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

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter: middleware.guest,
}

const routes = [
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  loginPage,
  configMenu,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/',
    beforeEnter: middleware.user,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: middleware.user,
      },
      {
        path: 'stats',
        name: 'Stats',
        beforeEnter: middleware.user,
      },
      {
        path: 'calendar',
        name: 'Calendar',
        beforeEnter: middleware.user,
      },
      {
        path: 'charts',
        name: 'Charts',
        beforeEnter: middleware.user,
      }
    ]
  },
  {path: '*', component: NotFound}
]

export default routes
