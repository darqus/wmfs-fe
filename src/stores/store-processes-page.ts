import { defineStore, } from 'pinia'

import { type QTableProps, } from 'quasar'

import { API, } from 'src/types/api'
import { type TPagination, type TDatePickerModel, type TTimePickerModel, type TBaseStore, } from 'src/types/components'
import { STORE_TYPES, } from 'src/types/enums'

import { useStoreNsiTypes, } from 'src/stores/store-nsi-types'

import { DEFAULT_NSI_TYPE_ID, HEADER_STYLE_LINE_BREAK, ROWS_PER_PAGE_OPTIONS, createInitialDatePickerModel, createInitialTimePickerModel, createPagination, getDatePicker, getInputRange, toggleLoading, } from 'src/utils/constants'
import { convertDateTimeToISO, formatISOToInternationalDateTime, } from 'src/utils/datetime'

import { api, } from 'src/boot/axios'

const nsiTypesStore = useStoreNsiTypes()

type TProcessesRow = {
  id: string
  guid: string
  status: string
  creationTime: string
  name: string
  regNumber: string
}

type TProcessesRows = TProcessesRow[]

type TCheckpointRow = {
  name: string
  value: number
  label: string
  date: string
}

type TCheckpointRows = TCheckpointRow[]

type TTabs = Record<string, string>

type TParams = {
  startDate: string
  endDate: string
  pageNum: number
  rowCount: number
  nsiTypeId: string
}

const processesColumns: QTableProps['columns'] = [
  { label: 'ID процесса', name: 'id', field: 'id', align: 'left', },
  { label: 'GUID', name: 'guid', field: 'guid', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Статус', name: 'status', field: 'status', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Поступило', name: 'creationTime', field: 'creationTime', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Страхователь', name: 'name', field: 'name', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Рег. номер страхователя', name: 'regNumber', field: 'regNumber', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const tabs: TTabs = {
  processes: 'processes-tab',
  schema: 'schema-tab',
  checkpoint: 'checkpoint-tab',
}

const currentTab = tabs.processes

const controlpointsColumns: QTableProps['columns'] = [
  { label: 'Контрольные точки', name: 'label', field: 'label', align: 'left', },
  { label: 'Количество', name: 'value', field: 'value', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Последний запуск', name: 'date', field: 'date', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

type TProcessesState = TBaseStore & {
  processesDatePickerModel: TDatePickerModel
  processesTimePickerModel: TTimePickerModel
  controlpointsDatePickerModel: TDatePickerModel
  controlpointsTimePickerModel: TTimePickerModel
  tabs: TTabs
  currentTab: string
  processesColumns: QTableProps['columns']
  processesRows: TProcessesRows
  processesPagination: TPagination
  processesSearch: string
  controlpointsColumns: QTableProps['columns']
  controlpointsRows: TCheckpointRows
  controlpointsPagination: TPagination
  // controlpointsSearch: string
  rowsPerPageOptions: number[]
}

const createInitialState = (): TProcessesState => ({
  loading: false,
  processesDatePickerModel: createInitialDatePickerModel(),
  processesTimePickerModel: createInitialTimePickerModel(),
  controlpointsDatePickerModel: createInitialDatePickerModel(),
  controlpointsTimePickerModel: createInitialTimePickerModel(),
  tabs,
  currentTab,
  processesColumns,
  processesRows: [],
  processesPagination: createPagination(),
  processesSearch: '',
  controlpointsColumns,
  controlpointsRows: [],
  controlpointsPagination: createPagination(),
  // controlpointsSearch: '',
  rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
})

export const useStoreProcessesPage = defineStore(STORE_TYPES.PROCESSES, {
  state: createInitialState,
  getters: {
    processesInputRange (): string {
      return getInputRange(this.processesDatePickerModel, this.processesTimePickerModel)
    },
    controlpointsInputRange (): string {
      return getInputRange(this.controlpointsDatePickerModel, this.controlpointsTimePickerModel)
    },
  },
  actions: {
    getEfsInfoWithStatus (props: { pagination: TPagination }) {
      const { processesDatePickerModel, processesTimePickerModel, }: { processesDatePickerModel: TDatePickerModel, processesTimePickerModel: TTimePickerModel } = this

      const datePicker = getDatePicker(processesDatePickerModel)

      const startDate = convertDateTimeToISO(datePicker[0], processesTimePickerModel?.from)
      const endDate = convertDateTimeToISO(datePicker[1], processesTimePickerModel?.to)

      const params: TParams = {
        startDate,
        endDate,
        pageNum: props.pagination.page,
        rowCount: props.pagination.rowsPerPage,
        nsiTypeId: nsiTypesStore?.currentNsi?.nsiTypeId ?? DEFAULT_NSI_TYPE_ID,
      }

      toggleLoading(this)
      api.post(API.getEfsInfoWithStatus, params)
        .then(({ data, }) => {
          const { data: processesResponseRows, totalRows, } = data

          this.processesPagination.rowsNumber = totalRows

          this.processesRows = processesResponseRows.filter((item: TProcessesRow) => this.processesSearch
            ? item.id.includes(this.processesSearch) || item.guid.includes(this.processesSearch)
            : true)
            .map((item: TProcessesRow) => ({
              ...item,
              creationTime: formatISOToInternationalDateTime(item.creationTime),
            }))

          // don't forget to update local pagination object
          this.processesPagination.page = props.pagination.page
          this.processesPagination.rowsPerPage = props.pagination.rowsPerPage
        })
        .finally(() => { toggleLoading(this) })
    },
    getControlPoints (props: { pagination: TPagination }) {
      const { controlpointsDatePickerModel, controlpointsTimePickerModel, }: { controlpointsDatePickerModel: TDatePickerModel, controlpointsTimePickerModel: TTimePickerModel } = this

      const datePicker = getDatePicker(controlpointsDatePickerModel)

      const startDate = convertDateTimeToISO(datePicker[0], controlpointsTimePickerModel?.from)
      const endDate = convertDateTimeToISO(datePicker[1], controlpointsTimePickerModel?.to)

      const params: TParams = {
        startDate,
        endDate,
        pageNum: props.pagination.page,
        rowCount: props.pagination.rowsPerPage,
        nsiTypeId: nsiTypesStore?.currentNsi?.nsiTypeId ?? DEFAULT_NSI_TYPE_ID,
      }

      toggleLoading(this)
      api.post(API.getControlPoints, params)
        .then(({ data, }) => {
          this.controlpointsRows = data.map((item: TCheckpointRow) => ({
            ...item,
            date: formatISOToInternationalDateTime(item.date),
          }))

          // don't forget to update local pagination object
          this.controlpointsPagination.page = props.pagination.page
          this.controlpointsPagination.rowsPerPage = props.pagination.rowsPerPage
        })
        .finally(() => { toggleLoading(this) })
    },
  },
})
