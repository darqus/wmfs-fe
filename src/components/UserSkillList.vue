<template>
  <div class="q-pa-md q-gutter-md">
    <q-badge
      v-for="{ name, color } in SKILL_TAGS"
      :key="name"
      :color="color"
    >
      #{{ name }}
    </q-badge>
  </div>
</template>

<script setup lang="ts">
const SKILL_TAGS = [
  {
    name: 'Подаван',
    color: 'secondary',
  },
  {
    name: 'Джедай',
    color: 'primary',
  },
  {
    name: 'Ситх',
    color: 'dark',
  },
]
</script>
