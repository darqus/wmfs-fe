<template>
  <div
    v-if="storeAuth.loggedIn"
    class="q-pa-md q-gutter-sm row justify-center"
  >
    <q-avatar
      size="70px"
      font-size="52px"
      color="primary"
      text-color="white"
      icon="person"
    />
    <q-input
      v-model="storeAuth.currentEmail"
      outlined
      readonly
      label="Ваш Email"
    />
  </div>
</template>

<script setup lang="ts">

import { useStoreAuth, } from 'src/stores/store-auth'

const storeAuth = useStoreAuth()

storeAuth.getCurrentUser()
</script>
