<template>
  <div class="row">
    <!-- <q-toggle
      v-model="storeEmployeeCards.isFilterVisible"
      color="pink"
      icon="filter_list_alt"
      label="Фильтры"
      class="q-mb-md q-mr-md"
      size="xl"
    />
    <template v-if="storeEmployeeCards.isFilterVisible">
      <q-select
        v-model="storeEmployeeCards.selectedFromLevel"
        class="q-mb-md"
        outlined
        clearable
        :options="storeEmployeeCards.optionsFromLevel"
        label="По уровню"
        style="width: 200px"
      />
      <div class="q-mr-md"></div>
      <q-select
        v-model="storeEmployeeCards.selectedFromPosition"
        class="q-mb-md"
        outlined
        clearable
        :options="storeEmployeeCards.optionsFromPosition"
        label="По должности"
        style="width: 300px"
      />
    </template>
  </div>
  <q-linear-progress
    v-if="!storeEmployeeCards.isEmployeeList"
    indeterminate
    class="q-mt-sm"
  />
  <div
    v-else
    class="row q-gutter-md users-list"
  >
    <q-card
      v-for="{
        id,
        name,
        email,
        position,
        level,
        description,
      } in storeEmployeeCards.filteredEmployeeList"
      :key="id"
      bordered
      style="overflow-x: auto"
    >
      <q-card-section style="height: 140px; overflow-y: auto">
        <div class="text-subtitle1">
          {{ name }}
        </div>
        <q-badge :color="storeEmployeeCards.getColorFromLevel(level)">
          #{{ level }}
        </q-badge>
        <div class="text-subtitle2">{{ position }}</div>
        <div class="text-subtitle2">{{ email }}</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section style="height: 100px; overflow-y: auto">
        {{ description }}
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script setup lang="ts">
// import { useStoreEmployeeCards } from 'src/stores/store-employee-cards'

// const storeEmployeeCards = useStoreEmployeeCards()

// storeEmployeeCards.getEmployeeList()
</script>

<style lang="scss">
@import "./scss/user-card-list";
</style>
