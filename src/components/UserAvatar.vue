<template>
  <div
    v-if="storeAuth.loggedIn"
    class="q-pa-md q-gutter-sm row justify-center"
  >
    <q-avatar
      color="primary"
      font-size="52px"
      icon="person"
      size="70px"
      text-color="white"
    />
    <q-input
      v-model="storeAuth.currentEmail"
      label="Ваш Email"
      outlined
      readonly
    />
  </div>
</template>

<script setup lang="ts">

import { useStoreAuth, } from 'src/stores/store-auth'

const storeAuth = useStoreAuth()

storeAuth.getCurrentUser()
</script>
