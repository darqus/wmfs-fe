<template>
  <q-list>
    <q-item-label header>
      {{ APP_NAME }}
    </q-item-label>

    <!-- <UserAvatar /> -->

    <template
      v-for="link in ROUTER_MENU_LINKS"
      :key="link.title"
    >
      <q-separator
        v-if="link.isSeperator"
        class="q-my-md"
      />
      <RouterMenuLink
        v-else
        v-bind="link"
      />
    </template>

    <!-- <div class="q-pa-md">
      <ThemeToggler />
    </div> -->
  </q-list>

  <small
    class="q-pa-md"
    v-text="`Версия ${VERSION}`"
  />
  <!-- <div
    v-if="storeAuth.loggedIn"
    class="q-pa-md"
  >
    <q-btn
      label="Выйти"
      color="primary"
      outline
      size="md"
      no-caps
      :disable="storeAuth.loading"
      :loading="storeAuth.loading"
      @click="storeAuth.onLogout()"
    />
  </div> -->
</template>

<script setup lang="ts">
import { computed, } from 'vue'
// import { useI18n, } from 'vue-i18n'

// import { useStoreAuth, } from 'stores/store-auth'

import { ROUTE_NAME, ROUTE_PATH, VITE_ROUTER_BASE, } from 'src/types/enums'

import { APP_NAME, VERSION, } from 'src/utils/meta'

import RouterMenuLink from 'components/RouterMenuLink.vue'
// import ThemeToggler from 'components/ThemeToggler.vue'
// import UserAvatar from 'components/UserAvatar.vue'

// const { t, } = useI18n()
// const storeAuth = useStoreAuth()
const ROUTER_MENU_LINKS = computed(() => [
  {
    icon: 'list_alt',
    title: ROUTE_NAME.HOME,
    path: VITE_ROUTER_BASE,
    visible: true,
  },
  {
    icon: 'percent',
    title: ROUTE_NAME.PROCESSES,
    path: ROUTE_PATH.PROCESSES,
    visible: true,
  },
  {
    icon: 'event',
    title: ROUTE_NAME.HISTORY,
    path: ROUTE_PATH.HISTORY,
    visible: true,
  },
  {
    icon: 'o_insert_chart',
    title: ROUTE_NAME.STATISTIC,
    path: ROUTE_PATH.STATISTIC,
    visible: true,
  },
  {
    icon: 'search',
    title: ROUTE_NAME.SEARCH,
    path: ROUTE_PATH.SEARCH,
    visible: true,
  },
  {
    title: 'seperator-0',
    isSeperator: true,
  },
  {
    icon: 'list',
    title: ROUTE_NAME.HELP,
    path: ROUTE_PATH.HELP,
    visible: true,
  },
  {
    icon: 'o_info',
    title: ROUTE_NAME.INFO,
    path: ROUTE_PATH.INFO,
    visible: true,
  },
])

// storeAuth.getCurrentUser()
</script>
