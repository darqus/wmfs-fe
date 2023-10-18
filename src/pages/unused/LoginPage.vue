<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      @submit.prevent="storeAuth.onLogin"
      @reset="storeAuth.onResetForm"
    >
      <div class="row justify-center text-h6">
        Вход
      </div>

      <q-input
        v-model="storeAuth.email"
        outlined
        dense
        label="Email"
        lazy-rules
        :rules="[...rules.required, ...rules.email]"
      />

      <q-input
        v-model="storeAuth.password"
        outlined
        dense
        type="password"
        label="Пароль"
        class="q-mb-lg"
        lazy-rules
        :rules="[...rules.required, ...rules.password]"
      />

      <div class="row justify-between">
        <q-btn
          label="Очистить"
          type="reset"
          color="primary"
          outline
          no-caps
          :disable="storeAuth.loading"
        />
        <q-btn
          label="Войти"
          type="submit"
          color="primary"
          no-caps
          :disable="storeAuth.loading"
          :loading="storeAuth.loading"
        />
      </div>

      <div class="row justify-center q-mt-md">
        <q-btn
          flat
          no-caps
          size="md"
          @click="$router.push('/forgot')"
        >
          Забыли пароль?
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useStoreAuth, } from 'src/stores/store-auth'

import rules from 'src/utils/rules'

const storeAuth = useStoreAuth()
</script>
