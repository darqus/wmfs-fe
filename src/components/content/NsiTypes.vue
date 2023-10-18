<template>
  <q-select
    v-model="nsiTypesStore.currentNsi"
    :options="nsiTypesStore.nsiTypes"
    :loading="nsiTypesStore.loading"
  />
</template>

<script setup lang="ts">
import { useStoreNsiTypes, } from 'src/stores/store-nsi-types'

const nsiTypesStore = useStoreNsiTypes()
</script>
