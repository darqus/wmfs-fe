<template>
  <PageLoader v-if="loading" />
  <q-page
    v-else
    class="q-pa-md"
  >
    <NsiTypes style="width: 200px" />

    <div class="row justify-between items-center q-py-md">
      <q-tabs
        v-model="currentTab"
        class="text-primary"
      >
        <q-tab
          :name="tabs.processes"
          no-caps
          label="Столбчатый"
        />
        <q-tab
          :name="tabs.checkpoint"
          no-caps
          label="Линейный"
        />
      </q-tabs>
    </div>
    <div class="row justify-between items-center q-py-md">
      <div>
        <q-chip
          v-for="chip in chips"
          v-show="chip.show ?? true"
          :key="chip.label"
          outline
          size="md"
          color="primary"
          text-color="white"
          clickable
          square
          class="q-mr-sm"
          :icon="chip.icon"
          :label="chip.label"
          @click="chip?.onClick"
        />
      </div>
      <div class="justify-end">
        <q-input
          v-model="search"
          label="Поиск"
          rounded
          outlined
          dense
          style="width: 328px;"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <q-tab-panel :name="tabs.processes">
        <div class="row justify-between">
          <div class="col-9 q-gutter-sm">
            <CommonChart :options="chartColumnStackedOptions" />
          </div>
          <div class="col-3 q-gutter-sm">
            <q-input
              v-model="received"
              label="Поступило"
              borderless
              readonly
            >
              <template #prepend>
                <q-icon name="forward_to_inbox" />
              </template>
            </q-input>

            <div class="text-subtitle2">
              Статус
            </div>

            <q-list>
              <q-item
                v-for="item in statusesRows"
                :key="item.label"
              >
                <q-item-section avatar>
                  <q-icon
                    :color="item.color"
                    name="circle"
                  />
                </q-item-section>

                <q-item-section>{{ item.label }}</q-item-section>

                <q-item-section avatar>
                  <div v-text="item.value" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel :name="tabs.checkpoint">
        <div class="row justify-between">
          <div class="col-9 q-gutter-sm">
            <CommonChart :options="chartBasicLineOptions" />
          </div>
          <div class="col-3 q-gutter-sm">
            <q-input
              v-model="received"
              label="Поступило"
              borderless
              readonly
            >
              <template #prepend>
                <q-icon name="forward_to_inbox" />
              </template>
            </q-input>

            <div class="text-subtitle2">
              Статус
            </div>

            <q-list>
              <q-item
                v-for="item in statusesRows"
                :key="item.label"
              >
                <q-item-section avatar>
                  <q-icon
                    :color="item.color"
                    name="circle"
                  />
                </q-item-section>

                <q-item-section>{{ item.label }}</q-item-section>

                <q-item-section avatar>
                  <div v-text="item.value" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, } from 'vue'

import { TSeries, TToolbarButtons, } from 'src/types/components'

import NsiTypes from 'components/content/NsiTypes.vue'
import CommonChart from 'components/Highcharts/CommonChart.vue'
import PageLoader from 'components/PageLoader.vue'

const loading = ref(true)

const toggleLoadingFake = () => {
  setTimeout(() => {
    loading.value = !loading.value
  }, 500)
}

toggleLoadingFake()

const chips: TToolbarButtons = [
  {
    label: 'Фильтр',
    icon: 'o_filter_alt',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'Сортировка',
    icon: 'sort',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
]

const search = ref('')

const tabs = {
  processes: 'processes-tab',
  checkpoint: 'checkpoint-tab',
}

const currentTab = ref(tabs.processes)

const chartOptionsColumnStacked = {
  chart: {
    type: 'column',
  },

  title: null,

  subtitle: null,

  yAxis: {
    title: {
      text: '',
    },
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
      },
    },
  },
}

const chartColumnStackedSeries: TSeries[] = [
  {
    name: 'Поступило',
    data: [ 43934, 48656, 65165, 81827, 112143, 142383,
      171533, 165174, 155157, 161454, 154610, ],
  },
  {
    name: 'Регистрация',
    data: [ 24916, 37941, 29742, 29851, 32490, 30282,
      38121, 36885, 33726, 34243, 31050, ],
  },
  {
    name: 'Формирование',
    data: [ 11744, 30000, 16005, 19771, 20185, 24377,
      32147, 30912, 29243, 29213, 25663, ],
  },
  {
    name: 'Отправка',
    data: [ null, null, null, null, null, null, null, null, 11164, 11218, 10077, ],
  },
  {
    name: 'Ожидание',
    data: [ 21908, 5548, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
  {
    name: 'Фин',
    data: [ 21908, 5548, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
]

const chartColumnStackedOptions = { ...chartOptionsColumnStacked, series: chartColumnStackedSeries, }

const chartOptionsBasicLine = {
  title: null,

  subtitle: null,

  yAxis: {
    title: {
      text: '',
    },
  },

  legend: {
    enabled: false,
  },
}

const chartBasicLineSeries: TSeries[] = [
  {
    name: 'Поступило',
    data: [ 43934, 48656, 65165, 81827, 112143, 142383,
      171533, 165174, 155157, 161454, 154610, ],
  },
  {
    name: 'Регистрация',
    data: [ 24916, 37941, 29742, 29851, 32490, 30282,
      38121, 36885, 33726, 34243, 31050, ],
  },
  {
    name: 'Формирование',
    data: [ 11744, 30000, 16005, 19771, 20185, 24377,
      32147, 30912, 29243, 29213, 25663, ],
  },
  {
    name: 'Отправка',
    data: [ null, null, null, null, null, null, null, null, 11164, 11218, 10077, ],
  },
  {
    name: 'Ожидание',
    data: [ 21908, 5548, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
  {
    name: 'Фин',
    data: [ 21908, 5548, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
]

const chartBasicLineOptions = { ...chartOptionsBasicLine, series: chartBasicLineSeries, }

const received = ref('21 октября 2022, 18:00')

const statusesRows = [
  {
    color: 'blue',
    label: 'В работе',
    value: 40,
  },
  {
    color: 'green',
    label: 'Обработано',
    value: 20,
  },
  {
    color: 'orange',
    label: 'Обработано частично',
    value: 15,
  },
  {
    color: 'red',
    label: 'Отказ обработки',
    value: 5,
  },
]
</script>
