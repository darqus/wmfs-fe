<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-pa-md"
      style="max-width: 400px"
      @reset="storeNewEmployee.onReset"
      @submit.prevent="storeNewEmployee.add"
    >
      <div class="row justify-center q-mb-md text-h5">
        Новый сотрудник
      </div>

      <q-input
        v-model="storeNewEmployee.name"
        :rules="rules.required"
        label="ФИО"
        dense
        lazy-rules
        outlined
      />

      <q-input
        v-model="storeNewEmployee.email"
        :rules="[...rules.required, ...rules.email]"
        label="Email"
        dense
        lazy-rules
        outlined
      />

      <q-input
        v-model="storeNewEmployee.position"
        :rules="rules.required"
        label="Должность"
        dense
        lazy-rules
        outlined
      />

      <q-select
        v-model="storeNewEmployee.level"
        :options="storeEmployeeCards.optionsFromLevel"
        :rules="rules.required"
        label="Уровень"
        dense
        lazy-rules
        outlined
      />

      <q-input
        v-model="storeNewEmployee.description"
        :rules="[]"
        label="Описание"
        dense
        lazy-rules
        outlined
      />

      <div class="row justify-between q-mt-md">
        <q-btn
          :disable="storeNewEmployee.loading"
          color="primary"
          label="Сбросить"
          type="reset"
          no-caps
          outline
        />
        <q-btn
          :disable="storeNewEmployee.loading"
          :loading="storeNewEmployee.loading"
          class="q-ml-md"
          color="primary"
          label="Добавить"
          type="submit"
          no-caps
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useStoreEmployeeCards, } from 'src/stores/store-employee-cards'
import { useStoreNewEmployee, } from 'src/stores/store-new-employee'

import rules from 'src/utils/rules'

const storeEmployeeCards = useStoreEmployeeCards()
const storeNewEmployee = useStoreNewEmployee()
</script>
