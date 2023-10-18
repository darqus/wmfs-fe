<template>
  <q-page class="q-pa-md">
    <NsiTypes style="width: 200px" />

    <!-- <div class="row justify-between items-center q-py-md">
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
          v-model="homePageStore.search"
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
    </div> -->
    <div class="row q-mt-lg">
      Итоговая информация {{ nsiTypesStore.currentNsi?.label }}
    </div>
    <div class="row justify-between">
      <div class="q-gutter-sm full-width">
        <div class="row">
          <div class="col-auto">
            <q-select
              v-for="item in homePageStore.summary"
              :key="item.label"
              v-model.value="item.value"
              readonly
              borderless
              :label="item.label"
              style="width: 150px"
              hide-dropdown-icon
            >
              <template #prepend>
                <q-icon :name="item.icon" />
              </template>
            </q-select>
          </div>
          <div class="col-auto">
            <q-table
              title="Статус"
              title-class="text-subtitle1"
              :rows="homePageStore.statusesRows"
              :columns="homePageStore.statusesColumns"
              row-key="color"
              hide-pagination
              hide-header
              dense
              flat
            >
              <template #body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <template v-if="col.name === 'color'">
                      <q-icon
                        :color="col.value"
                        round
                        dense
                        name="circle"
                      />
                    </template>
                    <template v-else>
                      {{ col.value }}
                    </template>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <div class="col-auto">
            <q-input
              v-model="homePageStore.lastStartDate"
              label="Последний запуск"
              borderless
              readonly
            >
              <template #prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row full-width">
          <CommonTable
            flat
            dense
            hide-pagination
            row-key="name"
            class="full-width"
            :rows="homePageStore.totalRows"
            :columns="homePageStore.totalColumns"
            :filter="homePageStore.search"
            :loading="homePageStore.loading"
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
                v-model="homePageStore.inputRange"
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
                      v-model="homePageStore.datePickerModel"
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
                        v-model="homePageStore.timePickerModel.from"
                        format24h
                        now-btn
                      />
                      <q-time
                        v-model="homePageStore.timePickerModel.to"
                        format24h
                        now-btn
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-space />
              <q-input
                v-model="homePageStore.search"
                rounded
                outlined
                dense
                clearable
                label="Поиск"
                :debounce="DEBOUNCE"
                style="width: 328px;"
                :disable="homePageStore.loading"
                :loading="homePageStore.loading"
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </CommonTable>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { watch, } from 'vue'

import { /* TSeries, */ TToolbarButtons, } from 'src/types/components'

import { useStoreHomePage, } from 'src/stores/store-home-page'
import { useStoreNsiTypes, } from 'src/stores/store-nsi-types'

import { DEBOUNCE, } from 'src/utils/constants'

import NsiTypes from 'components/content/NsiTypes.vue'
import CommonTable from 'src/components/CommonTable.vue'
// import CommonChart from 'components/Highcharts/CommonChart.vue'

const nsiTypesStore = useStoreNsiTypes()
const homePageStore = useStoreHomePage()

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
    onClick: () => onSwitchNsi(),
  },
]

/* const tabCharts = {
  daily: 'daily-tab-chart',
  monthly: 'monthly-tab-chart',
} */

// const currentCharTab = ref(tabCharts.daily)

/* const chartOptions = {
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
} */

/* const chartDailySeries: TSeries[] = [
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
 */
// const chartDeilyOptions = { ...chartOptions, series: chartDailySeries, }

/* const chartMonthlySeries: TSeries[] = [
  {
    name: 'Поступило',
    data: [ 43212, 43212, 54323, 19771, 20185, 24377,
      32147, 30912, 29243, 29213, 25663, ],
  },
  {
    name: 'Регистрация',
    data: [ null, null, null, null, null, null, null, null, 11164, 11218, 10077, ],
  },
  {
    name: 'Формирование',
    data: [ 23123, 21234, 16005, 19771, 20185, 24377,
      32147, 30912, 29243, 29213, 25663, ],
  },
  {
    name: 'Отправка',
    data: [ 12312, 32123, 41233, 65345, 12313, 65324, ],
  },
  {
    name: 'Ожидание',
    data: [ 32123, 3212, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
  {
    name: 'Фин',
    data: [ 31234, 4321, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073, ],
  },
] */

// const chartMonthlyOptions = { ...chartOptions, series: chartMonthlySeries, }

const onSwitchNsi = () => {
  if (nsiTypesStore.currentNsi?.nsiTypeId) {
    homePageStore.switchNsi(nsiTypesStore.currentNsi)
  }
}

watch(
  () => [ nsiTypesStore.currentNsi, ],
  () => {
    onSwitchNsi()
  }
)

onSwitchNsi()
</script>
