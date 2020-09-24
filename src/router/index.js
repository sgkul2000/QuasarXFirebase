
import firebaseServices from '../services/firebase'
import { Notify } from 'quasar'
import { store } from '../store/index'
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach(async (to, from, next) => {
    const { ensureAuthIsInitialized, isAuthenticated } = firebaseServices
    try {
      await ensureAuthIsInitialized(store)
      // console.log(true)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated(store)) {
          next()
        } else {
          console.log(isAuthenticated(store))
          next('/auth/login')
        }
      } else if ((to.path === '/auth/registration' && isAuthenticated(store)) ||
        (to.path === '/auth/login' && isAuthenticated(store))) {
        next('/user')
      } else {
        next()
      }
    } catch (err) {
      Notify.create({
        message: `${err}`,
        color: 'negative'
      })
    }
  })

  return Router
}
