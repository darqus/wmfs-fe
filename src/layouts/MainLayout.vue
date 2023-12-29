<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <img
          src="favicon.svg"
          alt="logo"
          width="32"
          height="32"
          class="q-ml-sm"
        />

        <q-toolbar-title> {{ APP_NAME }} </q-toolbar-title>

        <small v-text="version" />
      </q-toolbar>
    </q-header> -->

    <q-drawer
      v-model="leftDrawerOpen"
      :width="180"
      behavior="desktop"
      style="background-color: #fafafa;"
      persistent
      show-if-above
    >
      <SidebarDrawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, } from 'vue'

// import { APP_NAME, VERSION, } from 'src/utils/meta'

import SidebarDrawer from 'components/SidebarDrawer.vue'

const leftDrawerOpen = ref(false)
// const version = ref<string>(VERSION)

/* const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
} */
</script>
