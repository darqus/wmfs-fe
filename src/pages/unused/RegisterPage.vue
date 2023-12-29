<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      style="max-width: 400px"
      @reset="storeAuth.onResetForm"
      @submit.prevent="storeAuth.onRegister"
    >
      <div class="row justify-center q-mb-md text-h6">
        Регистрация
      </div>
      <q-input
        v-model="storeAuth.email"
        :rules="[...rules.required, ...rules.email]"
        label="Email"
        type="email"
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

      <!-- <q-toggle
        v-model="storeAuth.accept"
        label="I accept the license and terms"
      /> -->

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
          class="q-ml-lg"
          color="primary"
          label="Зарегистрироваться"
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
