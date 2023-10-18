<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-pa-md"
      style="max-width: 400px"
      @submit.prevent="storeNewEmployee.add"
      @reset="storeNewEmployee.onReset"
    >
      <div class="row justify-center q-mb-md text-h5">
        Новый сотрудник
      </div>

      <q-input
        v-model="storeNewEmployee.name"
        outlined
        dense
        label="ФИО"
        lazy-rules
        :rules="rules.required"
      />

      <q-input
        v-model="storeNewEmployee.email"
        outlined
        dense
        label="Email"
        lazy-rules
        :rules="[...rules.required, ...rules.email]"
      />

      <q-input
        v-model="storeNewEmployee.position"
        outlined
        dense
        label="Должность"
        lazy-rules
        :rules="rules.required"
      />

      <q-select
        v-model="storeNewEmployee.level"
        outlined
        dense
        label="Уровень"
        lazy-rules
        :options="storeEmployeeCards.optionsFromLevel"
        :rules="rules.required"
      />

      <q-input
        v-model="storeNewEmployee.description"
        outlined
        dense
        label="Описание"
        lazy-rules
        :rules="[]"
      />

      <div class="row justify-between q-mt-md">
        <q-btn
          label="Сбросить"
          type="reset"
          color="primary"
          outline
          no-caps
          :disable="storeNewEmployee.loading"
        />
        <q-btn
          label="Добавить"
          type="submit"
          color="primary"
          class="q-ml-md"
          no-caps
          :disable="storeNewEmployee.loading"
          :loading="storeNewEmployee.loading"
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
