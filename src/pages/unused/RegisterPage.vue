<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      style="max-width: 400px"
      @submit.prevent="storeAuth.onRegister"
      @reset="storeAuth.onResetForm"
    >
      <div class="row justify-center q-mb-md text-h6">
        Регистрация
      </div>
      <q-input
        v-model="storeAuth.email"
        outlined
        dense
        type="email"
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

      <!-- <q-toggle
        v-model="storeAuth.accept"
        label="I accept the license and terms"
      /> -->

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
          label="Зарегистрироваться"
          type="submit"
          color="primary"
          class="q-ml-lg"
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
