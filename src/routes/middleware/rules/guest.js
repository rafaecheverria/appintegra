import store from '@/store/auth'

/*
export default (to, from, next) => {
  if (store.state.token === null) {
    return next('/');
  }
  return next()
}*/


export default (to, from, next) => {
  if (store.state.token != null) {

    return next({
      name: 'Home',
    })
  }
  return next()
}
