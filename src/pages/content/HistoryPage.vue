<template>
  <q-page class="q-pa-md">
    <NsiTypes style="width: 200px" />

    <div class="row justify-between items-center q-py-md">
      <div>
        <q-btn
          v-for="btn in buttons"
          v-show="btn.show ?? true"
          :key="btn.label"
          :flat="btn.flat"
          class="q-mr-sm"
          :icon="btn.icon"
          color="primary"
          :label="btn.label"
          size="md"
          no-caps
          rounded
          unelevated
          @click="btn?.onClick"
        />
      </div>
      <div class="justify-end">
        <q-tabs
          v-model="historyPageStore.currentTab"
          class="text-primary"
        >
          <q-tab
            :name="historyPageStore.tabs.processes"
            label="Процессы"
            no-caps
          />
          <q-tab
            :name="historyPageStore.tabs.checkpoint"
            label="Контрольные точки"
            no-caps
          />
        </q-tabs>
      </div>
    </div>
    <div class="row">
      <q-tab-panels
        v-model="historyPageStore.currentTab"
        class="full-width"
        animated
      >
        <q-tab-panel :name="historyPageStore.tabs.processes">
          <CommonTable
            v-model:pagination="historyPageStore.pagination"
            :columns="historyPageStore.processesColumns"
            :filter="historyPageStore.search"
            :rows="historyPageStore.processesRows"
            :loading="historyPageStore.loading"
            :rows-per-page-options="historyPageStore.rowsPerPageOptions"
            row-key="globalProcessUdsId"
            dense
            flat
            @request="historyPageStore.getFinalStatusesWithinTimeframeUsingPOST"
          >
            <template #top>
              <q-chip
                v-for="chip in chips"
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
              <q-input
                v-model="historyPageStore.inputRange"
                label="Выберите интервал"
                style="width: 320px;"
                clearable
                :debounce="DEBOUNCE"
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
                      v-model="historyPageStore.datePickerModel"
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
                        v-model="historyPageStore.timePickerModel.from"
                        format24h
                        now-btn
                      />
                      <q-time
                        v-model="historyPageStore.timePickerModel.to"
                        format24h
                        now-btn
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-space />
              <q-input
                v-model="historyPageStore.search"
                label="Поиск"
                :debounce="DEBOUNCE"
                style="width: 328px;"
                :disable="historyPageStore.loading"
                clearable
                :loading="historyPageStore.loading"
                dense
                outlined
                rounded
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template #no-data="{ icon, message, filter }">
              <div
                align="center"
                class="full-width row flex-center q-gutter-sm q-pa-md"
              >
                <div
                  :class="{
                    'empty': true,
                    [`text-${icon}`]: icon
                  }"
                >
                  <q-icon
                    :name="filter ? 'filter_alt' : icon"
                    size="2em"
                  />
                  <span
                    class="text-subtitle2 q-ml-md"
                    v-text="message"
                  />
                </div>
              </div>
            </template>
          </CommonTable>
        </q-tab-panel>
        <q-tab-panel :name="historyPageStore.tabs.checkpoint" />
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { TToolbarButtons, } from 'src/types/components'

import { useStoreHistoryPage, } from 'src/stores/store-history-page'

import { DEBOUNCE, } from 'src/utils/constants'

import NsiTypes from 'components/content/NsiTypes.vue'
import CommonTable from 'src/components/CommonTable.vue'

const buttons: TToolbarButtons = [
  {
    label: 'Управление',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'Выгрузить логи',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
]

const chips: TToolbarButtons = [
  /* {
    label: 'Фильтр',
    icon: 'o_filter_alt',
    onClick: () => {},
  },
  {
    label: 'Сортировка',
    icon: 'sort',
    onClick: () => {},
  }, */
  {
    label: 'Обновить',
    icon: 'refresh',
    onClick: () => historyPageStore.getFinalStatusesWithinTimeframeUsingPOST({ pagination: historyPageStore.pagination, }),
  },
]

const historyPageStore = useStoreHistoryPage()

historyPageStore.getFinalStatusesWithinTimeframeUsingPOST({ pagination: historyPageStore.pagination, })
</script>
