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
        :rules="[...rules.required, ...rules.email]"
        label="Email"
        clearable
        dense
        lazy-rules
        outlined
      />

      <div class="row justify-center">
        <q-btn
          :disable="storeAuth.loading"
          :loading="storeAuth.loading"
          color="primary"
          label="Сбросить пароль"
          type="submit"
          no-caps
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
