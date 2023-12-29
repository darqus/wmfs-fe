<template>
  <q-page class="row bg-blue items-center justify-evenly">
    <div class="text-white text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 30vh">
          404
        </div>

        <div
          class="text-h2"
          style="opacity: 0.4"
        >
          {{ t('errors.notFound') }}
        </div>

        <q-btn
          :label="t('buttons.home')"
          class="q-mt-xl"
          color="white"
          text-color="blue"
          to="/"
          no-caps
          unelevated
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { i18n, } from 'src/boot/i18n'

const { t, } = i18n.global
</script>
