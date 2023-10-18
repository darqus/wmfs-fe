<template>
  <q-page class="q-pa-md">
    <NsiTypes style="width: 200px" />

    <div class="row justify-between items-center q-py-md">
      <div>
        <q-btn
          v-for="btn in buttons"
          v-show="btn.show ?? true"
          :key="btn.label"
          rounded
          unelevated
          no-caps
          size="md"
          color="primary"
          class="q-mr-sm"
          :flat="btn.flat"
          :icon="btn.icon"
          :label="btn.label"
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
            no-caps
            label="Процессы"
          />
          <q-tab
            :name="historyPageStore.tabs.checkpoint"
            no-caps
            label="Контрольные точки"
          />
        </q-tabs>
      </div>
    </div>
    <div class="row">
      <q-tab-panels
        v-model="historyPageStore.currentTab"
        animated
        class="full-width"
      >
        <q-tab-panel :name="historyPageStore.tabs.processes">
          <CommonTable
            v-model:pagination="historyPageStore.pagination"
            flat
            dense
            row-key="globalProcessUdsId"
            :rows-per-page-options="historyPageStore.rowsPerPageOptions"
            :rows="historyPageStore.processesRows"
            :columns="historyPageStore.processesColumns"
            :filter="historyPageStore.search"
            :loading="historyPageStore.loading"
            @request="historyPageStore.getFinalStatusesWithinTimeframeUsingPOST"
          >
            <template #top>
              <q-chip
                v-for="chip in chips"
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
              <q-input
                v-model="historyPageStore.inputRange"
                rounded
                outlined
                readonly
                clearable
                dense
                label="Выберите интервал"
                style="width: 320px;"
                :debounce="DEBOUNCE"
              >
                <template #prepend>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  />
                  <q-popup-proxy>
                    <q-date
                      v-model="historyPageStore.datePickerModel"
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
                rounded
                outlined
                dense
                clearable
                label="Поиск"
                style="width: 328px;"
                :debounce="DEBOUNCE"
                :disable="historyPageStore.loading"
                :loading="historyPageStore.loading"
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template #no-data="{ icon, message, filter }">
              <div
                class="full-width row flex-center q-gutter-sm q-pa-md"
                align="center"
              >
                <div
                  :class="{
                    'empty': true,
                    [`text-${icon}`]: icon
                  }"
                >
                  <q-icon
                    size="2em"
                    :name="filter ? 'filter_alt' : icon"
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
import { TToolbarButtons, } from 'src/types/components'

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
