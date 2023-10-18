<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      @submit.prevent="storeAuth.onForgot"
    >
      <div class="row justify-center text-h6">
        Восстановить доступ
      </div>

      <q-input
        v-model="storeAuth.email"
        outlined
        dense
        clearable
        label="Email"
        lazy-rules
        :rules="[...rules.required, ...rules.email]"
      />

      <div class="row justify-center">
        <q-btn
          label="Сбросить пароль"
          type="submit"
          color="primary"
          no-caps
          :disable="storeAuth.loading"
          :loading="storeAuth.loading"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useStoreAuth, } from 'src/stores/store-auth'

import rules from 'src/utils/rules'

const storeAuth = useStoreAuth()
</script>
