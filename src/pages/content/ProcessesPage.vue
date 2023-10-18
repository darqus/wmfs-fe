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
          v-model="processesPageStore.currentTab"
          class="text-primary"
        >
          <q-tab
            :name="processesPageStore.tabs.processes"
            no-caps
            label="Процессы"
          />
          <q-tab
            :name="processesPageStore.tabs.schema"
            no-caps
            label="Схема"
          />
          <q-tab
            :name="processesPageStore.tabs.checkpoint"
            no-caps
            label="Контрольные точки"
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
      </div>
      <div class="justify-end">
        <q-input
          v-model="processesPageStore.processesSearch"
          rounded
          outlined
          dense
          label="Поиск"
          style="width: 328px;"
          :debounce="DEBOUNCE"
          :disable="processesPageStore.loading"
          :loading="processesPageStore.loading"
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
        animated
        class="full-width"
      >
        <q-tab-panel :name="processesPageStore.tabs.processes">
          <CommonTable
            v-model:pagination="processesPageStore.processesPagination"
            dense
            flat
            row-key="guid"
            :rows-per-page-options="processesPageStore.rowsPerPageOptions"
            :rows="processesPageStore.processesRows"
            :columns="processesPageStore.processesColumns"
            :filter="processesPageStore.processesSearch"
            :loading="processesPageStore.loading"
            @request="processesPageStore.getEfsInfoWithStatus"
          >
            <template #top>
              <q-chip
                v-for="chip in processesChips"
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
                v-model="processesPageStore.processesInputRange"
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
                      v-model="processesPageStore.processesDatePickerModel"
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
        <q-tab-panel :name="processesPageStore.tabs.schema">
          <img
            src="svg/schema.svg"
            alt="some schema"
            height="477"
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
            dense
            flat
            row-key="guid"
            :rows-per-page-options="processesPageStore.rowsPerPageOptions"
            :rows="processesPageStore.controlpointsRows"
            :columns="processesPageStore.controlpointsColumns"
            :loading="processesPageStore.loading"
            @request="processesPageStore.getControlPoints"
          >
            <template #top>
              <q-chip
                v-for="chip in controlpointsChips"
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
                v-model="processesPageStore.controlpointsInputRange"
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
                      v-model="processesPageStore.controlpointsDatePickerModel"
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
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { TToolbarButtons, } from 'src/types/components'

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
