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
          v-model="processesPageStore.currentTab"
          class="text-primary"
        >
          <q-tab
            :name="processesPageStore.tabs.processes"
            label="Процессы"
            no-caps
          />
          <q-tab
            :name="processesPageStore.tabs.schema"
            label="Схема"
            no-caps
          />
          <q-tab
            :name="processesPageStore.tabs.checkpoint"
            label="Контрольные точки"
            no-caps
          />
        </q-tabs>
      </div>
    </div>
    <div
      v-if="false && processesPageStore.currentTab === processesPageStore.tabs.processes"
      class="row justify-between items-center q-py-md"
    >
      <div>
        <q-chip
          v-for="chip in processesChips"
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
      </div>
      <div class="justify-end">
        <q-input
          v-model="processesPageStore.processesSearch"
          :debounce="DEBOUNCE"
          :disable="processesPageStore.loading"
          label="Поиск"
          :loading="processesPageStore.loading"
          style="width: 328px;"
          dense
          outlined
          rounded
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <q-tab-panels
        v-model="processesPageStore.currentTab"
        class="full-width"
        animated
      >
        <q-tab-panel :name="processesPageStore.tabs.processes">
          <CommonTable
            v-model:pagination="processesPageStore.processesPagination"
            :columns="processesPageStore.processesColumns"
            :filter="processesPageStore.processesSearch"
            :loading="processesPageStore.loading"
            :rows="processesPageStore.processesRows"
            :rows-per-page-options="processesPageStore.rowsPerPageOptions"
            row-key="guid"
            dense
            flat
            @request="processesPageStore.getEfsInfoWithStatus"
          >
            <template #top>
              <q-chip
                v-for="chip in processesChips"
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
                v-model="processesPageStore.processesInputRange"
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
                      v-model="processesPageStore.processesDatePickerModel"
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
                        v-model="processesPageStore.processesTimePickerModel.from"
                        format24h
                        now-btn
                      />
                      <q-time
                        v-model="processesPageStore.processesTimePickerModel.to"
                        format24h
                        now-btn
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-space />
              <q-input
                v-model="processesPageStore.processesSearch"
                :debounce="DEBOUNCE"
                label="Поиск"
                style="width: 328px;"
                clearable
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
        <q-tab-panel :name="processesPageStore.tabs.schema">
          <img
            alt="some schema"
            height="477"
            src="svg/schema.svg"
            width="833"
          />
        </q-tab-panel>
        <q-tab-panel :name="processesPageStore.tabs.checkpoint">
          <!-- <CommonTable
            :rows="processesPageStore.checkpointsRows"
            :columns="processesPageStore.checkpointsColumns"
            row-key="name"
            flat
            dense
          /> -->
          <CommonTable
            v-model:pagination="processesPageStore.controlpointsPagination"
            :columns="processesPageStore.controlpointsColumns"
            :loading="processesPageStore.loading"
            :rows="processesPageStore.controlpointsRows"
            :rows-per-page-options="processesPageStore.rowsPerPageOptions"
            row-key="guid"
            dense
            flat
            @request="processesPageStore.getControlPoints"
          >
            <template #top>
              <q-chip
                v-for="chip in controlpointsChips"
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
                v-model="processesPageStore.controlpointsInputRange"
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
                      v-model="processesPageStore.controlpointsDatePickerModel"
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
                        v-model="processesPageStore.controlpointsTimePickerModel.from"
                        format24h
                        now-btn
                      />
                      <q-time
                        v-model="processesPageStore.controlpointsTimePickerModel.to"
                        format24h
                        now-btn
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- <q-space />
              <q-input
                v-model="processesPageStore.controlpointsSearch"
                rounded
                outlined
                dense
                clearable
                label="Поиск"
                :debounce="DEBOUNCE"
                style="width: 328px;"
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input> -->
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
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { TToolbarButtons, } from 'src/types/components'

import { useStoreProcessesPage, } from 'src/stores/store-processes-page'

import { DEBOUNCE, } from 'src/utils/constants'

import NsiTypes from 'components/content/NsiTypes.vue'
import CommonTable from 'src/components/CommonTable.vue'

const processesPageStore = useStoreProcessesPage()

const buttons: TToolbarButtons = [
  {
    label: 'Перезапустить',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'Остановить',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'Выгрузить логи',
    flat: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'Перейти в Camunda',
    flat: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
]

const processesChips: TToolbarButtons = [
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
    onClick: () => processesPageStore.getEfsInfoWithStatus({ pagination: processesPageStore.processesPagination, }),
  },
]

const controlpointsChips: TToolbarButtons = [
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
    onClick: () => processesPageStore.getControlPoints({ pagination: processesPageStore.controlpointsPagination, }),
  },
]

processesPageStore.getEfsInfoWithStatus({ pagination: processesPageStore.processesPagination, })
processesPageStore.getControlPoints({ pagination: processesPageStore.controlpointsPagination, })
</script>
