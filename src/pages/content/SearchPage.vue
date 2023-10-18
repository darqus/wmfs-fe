<template>
  <q-page class="q-pa-md">
    <div class="row q-gutter-lg q-mb-lg items-center">
      <q-select
        v-model="searchPageStore.currentTypeFilterList"
        :options="searchPageStore.selectTypeFilterList"
        style="width: 250px"
      />
      <q-radio
        v-for="item in searchPageStore.selectTypeFilterList"
        :key="item.type"
        v-model="searchPageStore.currentTypeFilterList"
        :val="item"
        :label="item.label"
      />
      <q-select
        v-model="searchPageStore.selectedFilterList"
        :options="Object.values(searchPageStore.filteredList)"
        multiple
        style="width: 350px"
      />
    </div>
    <div
      :class="{
        'search-row': true,
        'document': searchPageStore.currentTypeFilterList.type === 'document',
        'insurer': searchPageStore.currentTypeFilterList.type === 'insurer',
      }"
    >
      <template
        v-for="item in Object.values(searchPageStore.selectedFilterList)"
        :key="item.label"
      >
        <q-input
          v-if="item.type === COMPONENT_TYPE.INPUT"
          v-model="item.inputModel"
          rounded
          outlined
          dense
          clearable
          :debounce="DEBOUNCE"
          :label="item.label"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <NsiTypes
          v-if="item.type === COMPONENT_TYPE.SELECT"
          disable
          rounded
          outlined
          dense
          :label="item.label"
        />
        <q-input
          v-if="item.type === COMPONENT_TYPE.RANGE_PICKER"
          v-model="searchPageStore.inputRange"
          rounded
          outlined
          readonly
          clearable
          dense
          :label="item.label"
          :debounce="DEBOUNCE"
        >
          <template #prepend>
            <q-icon
              name="event"
              class="cursor-pointer"
            />
            <q-popup-proxy>
              <q-date
                v-model="searchPageStore.datePickerModel"
                mask="DD.MM.YYYY"
                minimal
                dense
                range
                no-unset
              />
            </q-popup-proxy>
          </template>
          <template #append>
            <q-icon
              name="access_time"
              class="cursor-pointer"
            >
              <q-popup-proxy>
                <q-time
                  v-model="searchPageStore.timePickerModel.from"
                  format24h
                  now-btn
                />
                <q-time
                  v-model="searchPageStore.timePickerModel.to"
                  format24h
                  now-btn
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </template>
      <div class="action-buttons">
        <q-btn
          rounded
          unelevated
          no-caps
          size="md"
          outline
          color="primary"
          label="Сбросить"
          :loading="searchPageStore.loading"
          :disable="searchPageStore.loading"
          @click="searchPageStore.reset"
        />
        <q-btn
          rounded
          unelevated
          no-caps
          size="md"
          color="primary"
          label="Найти"
          :loading="searchPageStore.loading"
          :disable="searchPageStore.loading"
          @click="searchPageStore.getEfsInfoByParams({ pagination: searchPageStore.pagination, })"
        />
      </div>
    </div>

    <CommonTable
      v-model:pagination="searchPageStore.pagination"
      flat
      dense
      row-key="globalProcessId"
      class="q-mt-lg"
      table-header-class="no-padding"
      :rows-per-page-options="searchPageStore.rowsPerPageOptions"
      :rows="searchPageStore.rows"
      :columns="searchPageStore.columns"
      :filter="searchPageStore.search"
      :loading="searchPageStore.loading"
      @request="searchPageStore.getEfsInfoByParams"
    >
      <template #top>
        <q-chip
          v-for="chip in searchPageStore.chips"
          v-show="chip.show ?? true"
          :key="chip.label"
          outline
          clickable
          square
          size="md"
          color="primary"
          text-color="white"
          class="q-mr-sm"
          :icon="chip.icon"
          :label="chip.label"
          @click="chip?.onClick"
        />
        <q-space />
        <q-input
          v-model="searchPageStore.search"
          rounded
          outlined
          dense
          clearable
          label="Поиск"
          style="width: 328px;"
          :debounce="DEBOUNCE"
          :disable="searchPageStore.loading"
          :loading="searchPageStore.loading"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </CommonTable>
  </q-page>
</template>

<script setup lang="ts">
import { COMPONENT_TYPE, } from 'src/types/enums'

import { useStoreSearchPage, } from 'src/stores/store-search-page'

import { DEBOUNCE, } from 'src/utils/constants'

import CommonTable from 'src/components/CommonTable.vue'
import NsiTypes from 'src/components/content/NsiTypes.vue'

const searchPageStore = useStoreSearchPage()

searchPageStore.getEfsInfoByParams({ pagination: searchPageStore.pagination, })
</script>

<style lang="scss">
@import "./scss/search-page";
</style>
