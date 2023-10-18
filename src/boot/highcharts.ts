// https://github.com/highcharts/highcharts-vue#importing-highcharts-modules

import { boot, } from 'quasar/wrappers'

import HighchartsVue from 'highcharts-vue'

export default boot(({ app, }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hc: any = HighchartsVue

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use(hc, { tagName: 'charts', })
})
