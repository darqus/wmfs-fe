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
        :label="item.label"
        :val="item"
      />
      <q-select
        v-model="searchPageStore.selectedFilterList"
        :options="Object.values(searchPageStore.filteredList)"
        style="width: 350px"
        multiple
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
          :debounce="DEBOUNCE"
          :label="item.label"
          clearable
          dense
          outlined
          rounded
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <NsiTypes
          v-if="item.type === COMPONENT_TYPE.SELECT"
          :label="item.label"
          dense
          disable
          outlined
          rounded
        />
        <q-input
          v-if="item.type === COMPONENT_TYPE.RANGE_PICKER"
          v-model="searchPageStore.inputRange"
          :label="item.label"
          :debounce="DEBOUNCE"
          clearable
          dense
          outlined
          readonly
          rounded
        >
          <template #prepend>
            <q-icon
              class="cursor-pointer"
              name="event"
            />
            <q-popup-proxy>
              <q-date
                v-model="searchPageStore.datePickerModel"
                mask="DD.MM.YYYY"
                dense
                minimal
                no-unset
                range
              />
            </q-popup-proxy>
          </template>
          <template #append>
            <q-icon
              class="cursor-pointer"
              name="access_time"
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
          color="primary"
          label="Сбросить"
          :loading="searchPageStore.loading"
          size="md"
          :disable="searchPageStore.loading"
          no-caps
          outline
          rounded
          unelevated
          @click="searchPageStore.reset"
        />
        <q-btn
          :loading="searchPageStore.loading"
          color="primary"
          :disable="searchPageStore.loading"
          label="Найти"
          size="md"
          no-caps
          rounded
          unelevated
          @click="searchPageStore.getEfsInfoByParams({ pagination: searchPageStore.pagination, })"
        />
      </div>
    </div>

    <CommonTable
      v-model:pagination="searchPageStore.pagination"
      :rows-per-page-options="searchPageStore.rowsPerPageOptions"
      :rows="searchPageStore.rows"
      class="q-mt-lg"
      :columns="searchPageStore.columns"
      row-key="globalProcessId"
      :filter="searchPageStore.search"
      table-header-class="no-padding"
      :loading="searchPageStore.loading"
      dense
      flat
      @request="searchPageStore.getEfsInfoByParams"
    >
      <template #top>
        <q-chip
          v-for="chip in searchPageStore.chips"
          v-show="chip.show ?? true"
          :key="chip.label"
          class="q-mr-sm"
          :icon="chip.icon"
          color="primary"
          :label="chip.label"
          size="md"
          text-color="white"
          clickable
          outline
          square
          @click="chip?.onClick"
        />
        <q-space />
        <q-input
          v-model="searchPageStore.search"
          label="Поиск"
          :debounce="DEBOUNCE"
          style="width: 328px;"
          :disable="searchPageStore.loading"
          clearable
          :loading="searchPageStore.loading"
          dense
          outlined
          rounded
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
