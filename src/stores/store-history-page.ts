import { defineStore, } from 'pinia'

import { type QTableProps, } from 'quasar'

import { API, } from 'src/types/api'
import { type TPagination, type TDatePickerModel, type TToolbarButtons, type TTimePickerModel, type TBaseStore, } from 'src/types/components'
import { STORE_TYPES, } from 'src/types/enums'

import { HEADER_STYLE_LINE_BREAK, ROWS_PER_PAGE_OPTIONS, createInitialDatePickerModel, createInitialTimePickerModel, createPagination, getDatePicker, getInputRange, toggleLoading, } from 'src/utils/constants'
import { convertDateTimeToISO, } from 'src/utils/datetime'

import { api, } from 'src/boot/axios'

enum ETabs {
  processes = 'processes',
  checkpoint = 'checkpoint',
}

type TTabs = Record<ETabs, string>

const tabs: TTabs = {
  processes: 'processes-tab',
  checkpoint: 'checkpoint-tab',
}

type TTab = string

const currentTab: TTab = tabs.processes

const chips: TToolbarButtons = [
  {
    label: 'Подробнее',
    icon: 'more_vert',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  {
    label: 'История поиска',
    icon: 'manage_history',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
]

type TProcessesRow = {
  process: string
  status: string
  globalProcessUdsId: string
  globalProcessId: string
  updatedAt: string
}

type TProcessesRows = TProcessesRow[]

const processesColumns: QTableProps['columns'] = [
  { label: 'Процесс', name: 'process', field: 'process', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Статус', name: 'status', field: 'status', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'ID', name: 'globalProcessUdsId', field: 'globalProcessUdsId', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'GUID', name: 'globalProcessId', field: 'globalProcessId', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  // { label: 'Поступило', name: 'createdAt', field: 'createdAt', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Завершило обработку', name: 'updatedAt', field: 'updatedAt', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const processesRows: TProcessesRows = []

type THistoryPageState = TBaseStore & {
  datePickerModel: TDatePickerModel
  timePickerModel: TTimePickerModel
  chips: TToolbarButtons
  tabs: TTabs
  currentTab: TTab
  processesColumns: QTableProps['columns']
  processesRows: TProcessesRows
  pagination: TPagination
  rowsPerPageOptions: number[]
  search: string
}

const createInitialState = (): THistoryPageState => ({
  loading: false,
  datePickerModel: createInitialDatePickerModel(),
  timePickerModel: createInitialTimePickerModel(),
  chips,
  tabs,
  currentTab,
  processesColumns,
  processesRows,
  pagination: createPagination(),
  rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
  search: '',
})

export const useStoreHistoryPage = defineStore(STORE_TYPES.HISTORY, {
  state: createInitialState,
  getters: {
    inputRange (): string {
      return getInputRange(this.datePickerModel, this.timePickerModel)
    },
  },
  actions: {
    getFinalStatusesWithinTimeframeUsingPOST (props: { pagination: TPagination }) {
      const { datePickerModel, timePickerModel, }: { datePickerModel: TDatePickerModel, timePickerModel: TTimePickerModel } = this

      const datePicker = getDatePicker(datePickerModel)

      const startDate = convertDateTimeToISO(datePicker[0], timePickerModel?.from)
      const endDate = convertDateTimeToISO(datePicker[1], timePickerModel?.to)

      toggleLoading(this)
      api.post(API.getFinalStatusesWithinTimeframeUsingPOST, {
        startDate,
        endDate,
        pageNum: props.pagination.page,
        rowCount: props.pagination.rowsPerPage,
      })
        .then(({ data, }) => {
          // :TODO support totalRows if implement on backend
          // const { data: responceRows, totalRows, } = data
          this.pagination.rowsNumber = 10

          this.processesRows = data.filter((item: TProcessesRow) => this.search
            ? item.globalProcessUdsId.includes(this.search) || item.globalProcessId.includes(this.search)
            : true)

          // don't forget to update local pagination object
          this.pagination.page = props.pagination.page
          this.pagination.rowsPerPage = props.pagination.rowsPerPage
        })
        .finally(() => { toggleLoading(this) })
    },
  },
})
