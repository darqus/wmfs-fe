<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      @reset="storeAuth.onResetForm"
      @submit.prevent="storeAuth.onLogin"
    >
      <div class="row justify-center text-h6">
        Вход
      </div>

      <q-input
        v-model="storeAuth.email"
        :rules="[...rules.required, ...rules.email]"
        label="Email"
        dense
        lazy-rules
        outlined
      />

      <q-input
        v-model="storeAuth.password"
        class="q-mb-lg"
        :rules="[...rules.required, ...rules.password]"
        label="Пароль"
        type="password"
        dense
        lazy-rules
        outlined
      />

      <div class="row justify-between">
        <q-btn
          :disable="storeAuth.loading"
          color="primary"
          label="Очистить"
          type="reset"
          no-caps
          outline
        />
        <q-btn
          :disable="storeAuth.loading"
          :loading="storeAuth.loading"
          color="primary"
          label="Войти"
          type="submit"
          no-caps
        />
      </div>

      <div class="row justify-center q-mt-md">
        <q-btn
          size="md"
          flat
          no-caps
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
