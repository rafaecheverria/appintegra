import store from '@/store'
import axios from 'axios'
import router from '../routes/routes'

store.subscribe(mutation => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN': {
      if (mutation.payload) {
        axios.defaults.headers.Authorization = `Bearer ${mutation.payload}`
        localStorage.setItem('token', mutation.payload)
      } else {
        axios.defaults.headers.Authorization = null
        localStorage.removeItem('token')
        console.log("fin de la sesion")
        //router.push({name: 'Login'})
      }
      break
    }
     case 'users/SET_CONSTITUENCY': {
       axios.defaults.headers.Authorization = `Bearer ${mutation.payload}`
       break
     }
    default:
  }
})
