<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-pa-md"
      style="max-width: 400px"
    >
      <div class="row justify-center q-mb-md text-h5">
        Профиль
      </div>

      <q-input
        v-model="storeAuth.currentEmail"
        :rules="[...rules.required, ...rules.email]"
        label="Email"
        dense
        disable
        lazy-rules
        outlined
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useStoreAuth, } from 'src/stores/store-auth'

import rules from 'src/utils/rules'

const storeAuth = useStoreAuth()

storeAuth.getCurrentUser()
</script>
