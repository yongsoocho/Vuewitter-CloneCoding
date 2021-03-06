import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _747b108a = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _1eb749c7 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _f745664a = () => interopDefault(import('../pages/hashtag/_id/index.vue' /* webpackChunkName: "pages/hashtag/_id/index" */))
const _8be52f86 = () => interopDefault(import('../pages/post/_id/index.vue' /* webpackChunkName: "pages/post/_id/index" */))
const _6c4557b0 = () => interopDefault(import('../pages/user/_id/index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _3d219173 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _747b108a,
    name: "profile"
  }, {
    path: "/signup",
    component: _1eb749c7,
    name: "signup"
  }, {
    path: "/hashtag/:id",
    component: _f745664a,
    name: "hashtag-id"
  }, {
    path: "/post/:id",
    component: _8be52f86,
    name: "post-id"
  }, {
    path: "/user/:id",
    component: _6c4557b0,
    name: "user-id"
  }, {
    path: "/",
    component: _3d219173,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
