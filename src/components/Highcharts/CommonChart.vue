<template>
  <charts
    ref="chart"
    :options="options"
    class="highcharts"
  />
</template>

<script setup>
import * as Highcharts from 'highcharts'
import * as ExportAccessibility from 'highcharts/modules/accessibility'
import * as ExportData from 'highcharts/modules/export-data'
import * as Exporting from 'highcharts/modules/exporting'

ExportAccessibility(Highcharts)
ExportData(Highcharts)
Exporting(Highcharts)

defineProps({
  options: {
    type: Object,
    default: null,
    required: true,
  },
})

</script>

<style lang="scss">
@import "./scss/highcharts";
</style>
