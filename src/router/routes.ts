import { type RouteRecordRaw, } from 'vue-router'

import { ROUTE_NAME, ROUTE_PATH, VITE_ROUTER_BASE, } from 'src/types/enums'

const routes: RouteRecordRaw[] = [
  {
    name: ROUTE_NAME.HOME,
    path: VITE_ROUTER_BASE,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [ { path: VITE_ROUTER_BASE, component: async () => await import('src/pages/content/HomePage.vue'), }, ],
  },
  {
    name: ROUTE_NAME.PROCESSES,
    path: ROUTE_PATH.PROCESSES,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.PROCESSES, component: async () => await import('src/pages/content/ProcessesPage.vue'), },
    ],
  },
  {
    name: ROUTE_NAME.HISTORY,
    path: ROUTE_PATH.HISTORY,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.HISTORY, component: async () => await import('src/pages/content/HistoryPage.vue'), },
    ],
  },
  {
    name: ROUTE_NAME.STATISTIC,
    path: ROUTE_PATH.STATISTIC,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.STATISTIC, component: async () => await import('src/pages/content/StatisticPage.vue'), },
    ],
  },
  {
    name: ROUTE_NAME.SEARCH,
    path: ROUTE_PATH.SEARCH,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.SEARCH, component: async () => await import('src/pages/content/SearchPage.vue'), },
    ],
  },
  {
    name: ROUTE_NAME.HELP,
    path: ROUTE_PATH.HELP,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.HELP, component: async () => await import('src/pages/content/HelpPage.vue'), },
    ],
  },
  {
    name: ROUTE_NAME.INFO,
    path: ROUTE_PATH.INFO,
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: ROUTE_PATH.INFO, component: async () => await import('src/pages/content/InfoPage.vue'), },
    ],
  },

  /* {
    path: '/register',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [ { path: '', component: async () => await import('src/pages/RegisterPage.vue'), }, ],
  },
  {
    path: '/login',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [ { path: '', component: async () => await import('src/pages/LoginPage.vue'), }, ],
  },
  {
    path: '/forgot',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [ { path: '', component: async () => await import('src/pages/ForgotPage.vue'), }, ],
  },
  {
    path: '/account',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [ { path: '', component: async () => await import('src/pages/AccountPage.vue'), }, ],
    meta: {
      requiredAuth: true,
    },
  }, */

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/access-deny',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: async () => await import('src/pages/error/ErrorAccessDeny.vue'), },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: async () => await import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: async () => await import('src/pages/error/ErrorNotFound.vue'), },
    ],
  },
]

export default routes
