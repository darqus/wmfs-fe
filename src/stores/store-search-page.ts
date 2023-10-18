import { defineStore, } from 'pinia'

import { type QTableProps, } from 'quasar'

import { API, } from 'src/types/api'
import { type TPagination, type TDatePickerModel, type TToolbarButtons, type TTimePickerModel, type TBaseStore, } from 'src/types/components'
import { COMPONENT_TYPE, STORE_TYPES, } from 'src/types/enums'

import { HEADER_STYLE_LINE_BREAK, ROWS_PER_PAGE_OPTIONS, createCurrentNsiType, createInitialDatePickerModel, createInitialTimePickerModel, createPagination, getDatePicker, getInputRange, toggleLoading, } from 'src/utils/constants'
import { convertDateTimeToISO, formatISOToInternationalDateTime, } from 'src/utils/datetime'

import { api, } from 'src/boot/axios'

import { type TNsiTypes, type TNsiType, } from './store-nsi-types'

type TSelectTypeFilterList = {
  type: string
  label: string
}

enum ETabs {
  all = 'all',
  document = 'document',
  insurer = 'insurer',
}

/* type TTabs = Record<ETabs, string>

const tabs: TTabs = {
  document: 'document-tab',
  insurer: 'insurer-tab',
}

type TTab = string

const currentTab: TTab = tabs.document */

const selectTypeFilterList: TSelectTypeFilterList[] = [
  {
    type: ETabs.all,
    label: 'Все реквизиты',
  },
  {
    type: ETabs.document,
    label: 'Реквизиты документа',
  },
  {
    type: ETabs.insurer,
    label: 'Реквизиты страхователя',
  },
]

type TFilterList = {
  type: string
  label: string
  inputModel?: string
  selectModel?: TNsiType
  datePickerModel?: TDatePickerModel
  options?: TNsiTypes
}

type TFilterLists = TFilterList[]

type TFilterListsObject = Record<string, TFilterList>

const filterList: TFilterListsObject = {
  nsiTypeId: {
    type: COMPONENT_TYPE.SELECT,
    label: 'По типу',
  },
  creationDate: {
    type: COMPONENT_TYPE.RANGE_PICKER,
    label: 'В указанный промежуток времени',
  },
  udsId: {
    type: COMPONENT_TYPE.INPUT,
    label: 'По ID',
    inputModel: '',
  },
  guid: {
    type: COMPONENT_TYPE.INPUT,
    label: 'По GUID',
    inputModel: '',
  },
  regNumber: {
    type: COMPONENT_TYPE.INPUT,
    label: 'По регистрационному номеру',
    inputModel: '',
  },
  name: {
    type: COMPONENT_TYPE.INPUT,
    label: 'По названию страхователя',
    inputModel: '',
  },
  inn: {
    type: COMPONENT_TYPE.INPUT,
    label: 'По ИНН',
    inputModel: '',
  },
}

const selectedFilterList: TFilterLists = Array.from(Object.values(filterList))

const chips: TToolbarButtons = [
  /* {
    label: 'Подробнее',
    icon: 'more_vert',
    onClick: () => {},
  },
  {
    label: 'История поиска',
    icon: 'manage_history',
    onClick: () => {},
  }, */
]

type TDocumentRow = {
  documentType?: string
  creationDate: string
  guid: string
  udsId: string
  inn: string
  name: string
  regNumber: string
}

type TDocumentRows = TDocumentRow[]

const columns: QTableProps['columns'] = [
  { label: 'Тип документа', name: 'documentType', field: 'documentType', align: 'left', }, // hardcode
  { label: 'Время обработки, мс', name: 'processingTime', field: 'processingTime', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'ID документа в ЕХД', name: 'udsId', field: 'udsId', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'GUID', name: 'guid', field: 'guid', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Регистрационный номер страхователя', name: 'regNumber', field: 'regNumber', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Название страхователя', name: 'name', field: 'name', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'ИНН', name: 'inn', field: 'inn', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
  { label: 'Дата поступления', name: 'creationDate', field: 'creationDate', align: 'left', headerStyle: HEADER_STYLE_LINE_BREAK, },
]

const rows: TDocumentRows = []

type TSearchPageState = TBaseStore & {
  selectTypeFilterList: TSelectTypeFilterList[]
  currentTypeFilterList: TSelectTypeFilterList
  filterList: TFilterListsObject
  selectedFilterList: TFilterLists
  datePickerModel: TDatePickerModel
  timePickerModel: TTimePickerModel
  chips: TToolbarButtons
  // tabs: TTabs
  // currentTab: TTab
  columns: QTableProps['columns']
  rows: TDocumentRows
  pagination: TPagination
  rowsPerPageOptions: number[]
  // filteredRows: TDocumentRows
  search: string
}

const createInitialState = (): TSearchPageState => ({
  loading: false,
  selectTypeFilterList,
  currentTypeFilterList: selectTypeFilterList[0],
  filterList,
  selectedFilterList,
  datePickerModel: createInitialDatePickerModel(),
  timePickerModel: createInitialTimePickerModel(),
  chips,
  // tabs,
  // currentTab,
  columns,
  rows,
  pagination: createPagination(),
  rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
  search: '',
})

export const useStoreSearchPage = defineStore(STORE_TYPES.SEARCH, {
  state: createInitialState,
  getters: {
    filteredList (state): TFilterListsObject {
      switch (state.currentTypeFilterList.type) {
        case ETabs.document: {
          const filteredKeys: string[] = Object.keys(state.filterList).filter((key) => [ 'nsiTypeId', 'creationDate', 'guid', 'udsId', ].includes(key))

          const result = Object.fromEntries(filteredKeys.map((key) => [ key, state.filterList[key], ]))

          state.selectedFilterList = Array.from(Object.values(result))

          return result
        }

        case ETabs.insurer: {
          const filteredKeys: string[] = Object.keys(state.filterList).filter((key) => [ 'regNumber', 'name', 'inn', ].includes(key))

          const result = Object.fromEntries(filteredKeys.map((key) => [ key, state.filterList[key], ]))

          state.selectedFilterList = Array.from(Object.values(result))

          return result
        }

        default: {
          state.selectedFilterList = Array.from(Object.values(filterList))

          return state.filterList
        }
      }
    },
    inputRange (): string {
      return getInputRange(this.datePickerModel, this.timePickerModel)
    },
  },
  actions: {
    getEfsInfoByParams (props: { pagination: TPagination }) {
      const regNumber = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.INPUT && it.label === 'По регистрационному номеру')?.inputModel ?? ''
      const guid = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.INPUT && it.label === 'По GUID')?.inputModel ?? ''
      const udsId = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.INPUT && it.label === 'По ID')?.inputModel ?? ''
      const inn = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.INPUT && it.label === 'По ИНН')?.inputModel ?? ''
      const name = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.INPUT && it.label === 'По наименованию')?.inputModel ?? ''
      const nsiTypeId = this.selectedFilterList.find(it => it.type === COMPONENT_TYPE.SELECT && it.label === 'По типу') ?? createCurrentNsiType().nsiTypeId

      const { datePickerModel, timePickerModel, }: { datePickerModel: TDatePickerModel, timePickerModel: TTimePickerModel } = this

      const datePicker = getDatePicker(datePickerModel)

      const startDate = convertDateTimeToISO(datePicker[0], timePickerModel?.from)
      const endDate = convertDateTimeToISO(datePicker[1], timePickerModel?.to)

      const params = {
        endDate,
        startDate,
        guid,
        udsId,
        inn,
        name,
        regNumber,
        nsiTypeId,
        pageNum: props.pagination.page,
        rowCount: props.pagination.rowsPerPage,
      }

      toggleLoading(this)
      api.post(API.getEfsInfoByParams, params)
        .then(({ data, }) => {
          const { data: responceRows, totalRows, } = data

          // update rowsCount with appropriate value
          this.pagination.rowsNumber = totalRows

          // without filter/find rows
          /* this.rows = responceRows.map((item: TDocumentRow) => ({
            ...item,
            documentType: 'ЕФС-1',
            creationDate: formatISOToInternationalDateTime(item.creationDate),
          })) */

          // filter/find rows from udsId and guid
          this.rows = responceRows
            .filter((item: TDocumentRow) => this.search
              ? item.udsId.includes(this.search) || item.guid.includes(this.search)
              : true)
            .map((item: TDocumentRow) => ({
              ...item,
              documentType: 'ЕФС-1',
              creationDate: formatISOToInternationalDateTime(item.creationDate),
            }))

          // don't forget to update local pagination object
          this.pagination.page = props.pagination.page
          this.pagination.rowsPerPage = props.pagination.rowsPerPage
        })
        .finally(() => { toggleLoading(this) })
    },
    reset () {
      // this.$state = createInitialState()
      this.datePickerModel = createInitialDatePickerModel()
      this.timePickerModel = createInitialTimePickerModel()

      this.selectedFilterList = selectedFilterList.map((item) => {
        if (item.inputModel) {
          return {
            ...item,
            inputModel: '',
          }
        } else {
          return item
        }
      })

      this.getEfsInfoByParams({ pagination: this.pagination, })
    },
  },
})
