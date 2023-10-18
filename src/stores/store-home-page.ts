import { defineStore, } from 'pinia'

import { type QTableProps, } from 'quasar'

import { API, } from 'src/types/api'
import { type TTimePickerModel, type TDatePickerModel, type TBaseStore, } from 'src/types/components'
import { NSI_TYPES, STORE_TYPES, } from 'src/types/enums'

import { HEADER_STYLE_LINE_BREAK, createInitialDatePickerModel, createInitialTimePickerModel, getDatePicker, getInputRange, toggleLoading, } from 'src/utils/constants'
import { convertDateTimeToISO, formatISOToInternationalDateTime, } from 'src/utils/datetime'

import { api, } from 'src/boot/axios'

import { type TNsiType, } from './store-nsi-types'

type TSummary = {
  label: string
  name: string
  value: number
  icon?: string
}

type TSummaryRows = TSummary[]

type TStatus = {
  color: string
  label: string
  name: string
  value: number
}

type TStatusRows = TStatus[]

type TGlobalCurrentProcenning = {
  formation: number
  received: number
  registration: number
  sending: number
  source: string
  upgrade: number
}

type TChildCurrentProcenning = {
  precessing: string
  formation: number
  received: number
  sending: number
  upgrade: number
}

type TChildCurrentProcenningDSV3 = {
  precessing: string
  received: number
}

type TTotalRows = TGlobalCurrentProcenning[] | TChildCurrentProcenning[] | TChildCurrentProcenningDSV3[]

const summaryIconMap: Record<string, string> = {
  CREATED: 'outgoing_mail',
  PROCESSING: 'refresh',
  COMPLETED: 'add_business',
}

const statusesColumns: QTableProps['columns'] = [
  { label: '', name: 'color', field: 'color', align: 'center', },
  { label: '', name: 'label', field: 'label', align: 'left', },
  { label: '', name: 'value', field: 'value', align: 'right', },
]

const totalColumnsGlobal: QTableProps['columns'] = [
  { label: 'Источник', name: 'source', field: 'source', align: 'left', },
  { label: 'Поступило ЕФС-1', name: 'received', field: 'received', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Регистрация пакета и документа', name: 'registration', field: 'registration', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Формирование УПП ЕФС-1', name: 'formation', field: 'formation', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Отправка ЕФС-1 в обработку', name: 'sending', field: 'sending', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Фин. обновление статуса ЕФС-1 в ЕХД1', name: 'upgrade', field: 'upgrade', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const totalColumnsChildGroup: QTableProps['columns'] = [
  { label: 'Сформировано всего', name: 'received', field: 'received', align: 'left', },
  { label: 'Обработка всего', name: 'processing', field: 'processing', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Формирование УПП', name: 'formation', field: 'formation', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Передача документа в обработку', name: 'sending', field: 'sending', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Обновление статуса в ЕХД', name: 'upgrade', field: 'upgrade', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const totalColumnsChildSZIFSS: QTableProps['columns'] = [
  { label: 'Сформировано всего', name: 'received', field: 'received', align: 'left', },
  { label: 'Обработка всего', name: 'processing', field: 'processing', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Передача документа в обработку', name: 'sending', field: 'sending', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Обработка ЕИИС-СОЦСТРАХ', name: 'formation', field: 'formation', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Обновление статуса в ЕХД', name: 'upgrade', field: 'upgrade', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const totalColumnsChildDSV3: QTableProps['columns'] = [
  { label: 'Сформировано всего', name: 'received', field: 'received', align: 'left', },
  { label: 'Доставка в PERSO', name: 'processed', field: 'processed', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const totalRows: TTotalRows = []

type THomePageState = TBaseStore & {
  summary: TSummaryRows
  statusesColumns: QTableProps['columns']
  statusesRows: TStatusRows
  datePickerModel: TDatePickerModel
  timePickerModel: TTimePickerModel
  totalColumns: QTableProps['columns']
  totalRows: TTotalRows
  lastStartDate: string
  search: string
}

const createInitialState = (): THomePageState => ({
  loading: false,
  summary: [],
  statusesColumns,
  statusesRows: [],
  datePickerModel: createInitialDatePickerModel(),
  timePickerModel: createInitialTimePickerModel(),
  totalColumns: totalColumnsGlobal,
  totalRows,
  lastStartDate: '',
  search: '',
})

export const useStoreHomePage = defineStore(STORE_TYPES.HOME, {
  state: createInitialState,
  getters: {
    inputRange (): string {
      return getInputRange(this.datePickerModel, this.timePickerModel)
    },
  },
  actions: {
    getChildTotalColumns (name: string) {
      switch (name) {
        case NSI_TYPES.SZIFSS: {
          return totalColumnsChildSZIFSS
        }

        case NSI_TYPES.DSV3: {
          return totalColumnsChildDSV3
        }

        default: {
          return totalColumnsChildGroup
        }
      }
    },
    switchNsi (currentNsi: TNsiType) {
      const { datePickerModel, timePickerModel, }: { datePickerModel: TDatePickerModel, timePickerModel: TTimePickerModel } = this

      const datePicker = getDatePicker(datePickerModel)

      const startDate = convertDateTimeToISO(datePicker[0], timePickerModel?.from)
      const endDate = convertDateTimeToISO(datePicker[1], timePickerModel?.to)

      switch (currentNsi.name) {
        // ЕФС-1
        case NSI_TYPES.MAIN: {
          toggleLoading(this)
          api.post(API.getGlobalProcessStatusesMainInfo, {
            startDate,
            endDate,
          })
            .then(({ data, }) => {
              const { summary, status, lastStartDate, globalCurrentProcenning, }: { summary: TSummary[], status: TStatusRows, lastStartDate: string, globalCurrentProcenning: TGlobalCurrentProcenning[] } = data

              const summaryWithIcons: TSummaryRows = summary.map((item: TSummary) => ({
                ...item,
                icon: summaryIconMap[item.name],
              }))

              this.summary = summaryWithIcons
              this.statusesRows = status
              this.lastStartDate = formatISOToInternationalDateTime(lastStartDate)

              const totalColumns = totalColumnsGlobal

              this.totalColumns = totalColumns
              this.totalRows = globalCurrentProcenning
            })
            .finally(() => { toggleLoading(this) })
          break
        }

        // ДСВ-3
        case NSI_TYPES.DSV3: {
          toggleLoading(this)
          api.post(API.getChildProcessStatusDsv3Info, {
            startDate,
            endDate,
            nsiTypeId: currentNsi.nsiTypeId,
          })
            .then(({ data, }) => {
              const { summary, status, lastStartDate, childCurrentProcenning, }: { summary: TSummary[], status: TStatusRows, lastStartDate: string, childCurrentProcenning: TChildCurrentProcenningDSV3[] } = data

              const summaryWithIcons: TSummaryRows = summary.map((item: TSummary) => ({
                ...item,
                icon: summaryIconMap[item.name],
              }))

              this.summary = summaryWithIcons
              this.statusesRows = status
              this.lastStartDate = formatISOToInternationalDateTime(lastStartDate)

              const totalColumns = this.getChildTotalColumns(currentNsi.name)

              this.totalColumns = totalColumns
              this.totalRows = childCurrentProcenning
            })
            .finally(() => { toggleLoading(this) })
          break
        }

        // СЗИ-ФСС
        case NSI_TYPES.SZIFSS: {
          toggleLoading(this)
          api.post(API.getChildProcessStatusFssInfo, {
            startDate,
            endDate,
            nsiTypeId: currentNsi.nsiTypeId,
          })
            .then(({ data, }) => {
              const { summary, status, lastStartDate, childCurrentProcenning, }: { summary: TSummary[], status: TStatusRows, lastStartDate: string, childCurrentProcenning: TChildCurrentProcenningDSV3[] } = data

              const summaryWithIcons: TSummaryRows = summary.map((item: TSummary) => ({
                ...item,
                icon: summaryIconMap[item.name],
              }))

              this.summary = summaryWithIcons
              this.statusesRows = status
              this.lastStartDate = formatISOToInternationalDateTime(lastStartDate)

              const totalColumns = this.getChildTotalColumns(currentNsi.name)

              this.totalColumns = totalColumns
              this.totalRows = childCurrentProcenning
            })
            .finally(() => { toggleLoading(this) })
          break
        }

        // СЗВ-СТАЖ-ЕФС, СЗВ-БЮДЖ, СЗВ-ТД-ЕФС, ЕФС-ОДВ-1
        default: {
          toggleLoading(this)
          api.post(API.getChildProcessStatusMainInfo, {
            startDate,
            endDate,
            nsiTypeId: currentNsi.nsiTypeId,
          })
            .then(({ data, }) => {
              const { summary, status, lastStartDate, childCurrentProcenning, }: { summary: TSummary[], status: TStatusRows, lastStartDate: string, childCurrentProcenning: TChildCurrentProcenning[] } = data

              const summaryWithIcons: TSummaryRows = summary.map((item: TSummary) => ({
                ...item,
                icon: summaryIconMap[item.name],
              }))

              this.summary = summaryWithIcons
              this.statusesRows = status
              this.lastStartDate = formatISOToInternationalDateTime(lastStartDate)

              const totalColumns = this.getChildTotalColumns(currentNsi.name)

              this.totalColumns = totalColumns
              this.totalRows = childCurrentProcenning
            })
            .finally(() => { toggleLoading(this) })
        }
      }
    },
  },
})
