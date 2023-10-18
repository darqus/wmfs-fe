<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta, } from 'quasar'

import { meta, } from 'src/utils/meta'

useMeta(meta)
</script>
