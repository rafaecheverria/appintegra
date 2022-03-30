import store from '@/store/auth'

/*export default (to, from, next) => {
  if (store.state.token === null) {
   return next('/login')
  }
  return next()
}
*/

export default (to, from, next) => {
  if (store.state.token === null) {

    return next({
      name: 'Login',
    })
  }

 return next()
}
