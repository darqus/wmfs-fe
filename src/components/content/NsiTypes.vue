<template>
  <q-select
    v-model="nsiTypesStore.currentNsi"
    :loading="nsiTypesStore.loading"
    :options="nsiTypesStore.nsiTypes"
  />
</template>

<script setup lang="ts">
import { useStoreNsiTypes, } from 'src/stores/store-nsi-types'

const nsiTypesStore = useStoreNsiTypes()
</script>
