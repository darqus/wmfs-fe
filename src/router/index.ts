import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { route, } from 'quasar/wrappers'

import routes from './routes'

export default route(() => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const createHistory = import.meta.env.VITE_SERVER
    ? createMemoryHistory
    : import.meta.env.VITE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  return createRouter({
    scrollBehavior: () => ({ left: 0, top: 0, }),
    routes,

    history: createHistory(import.meta.env.VITE_ROUTER_BASE),
  })
})
