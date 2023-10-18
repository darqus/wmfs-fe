import { type ValidationRule, type QTableColumn, type QInputType, } from 'quasar'

import { type BUTTON_TYPE, type COMPONENT_TYPE, } from './enums'

export type TBaseStore = {
  loading: boolean
}

export type TOptionProp = {
  label: string
  value: unknown
  // checkedIcon: 'check'
  // uncheckedIcon: 'none'
}

export type TStateOption = {
  label: string
  value: number
  color: string
  text: string
}

export type TTableColumn =
  {
    tooltip?: string
    icon?: string
    unit?: string
    formatName?: string
    sortByFieldName?: string
  } & QTableColumn

type TFilter = {
  name: string
  value: string
}

export type TPagination = {
  sortBy: string
  descending: boolean
  page: number
  rowsPerPage: number
  rowsNumber: number
}

export type TSortColumn = {
  name: string
  asc?: boolean
  desc: boolean
  fieldName: string
}

export type TRange = {
  from: string
  to: string
}

export type TDatePickerModel = string | TRange

export type TTimePickerModel = TRange

export type TMinMax = {
  min: number
  max: number
}

export type TTableColumns = Array<unknown | QTableColumn>

type TProcessAssetOptionValue = {
  id: number
  cost?: number
}

export type TProcessAssetOption = {
  value: TProcessAssetOptionValue
  label: string
}

type TComponentBaseData = {
  componentType: COMPONENT_TYPE
}

export type TSeparator = TComponentBaseData

export type TComponentBaseInputData = TComponentBaseData & {
  fieldName: string
  label?: string
  rule?: ValidationRule[]
  required?: boolean
  readonly?: boolean
  clearable?: boolean
  iconPrepend?: string
  iconAppend?: string
  isEditable?: boolean
}

export type TInput = QInputType

export type TInputData = TComponentBaseInputData & {
  model: string
  inputType?: TInput
  mask?: string
}

type TOption<T> = {
  model: string
  label: string
  value: T
}

export type TDatePicker = TComponentBaseInputData & {
  model: string
}

export type TGroupData = TComponentBaseInputData & {
  model: string
}

export type TRangePicker = TComponentBaseInputData & {
  model: TMinMax
  range: TMinMax
  innerRange: TMinMax
}

export type TPeriodData = TInputData & {
  startDateFieldName: string
  endDateFieldName: string
  workDurationFieldName: string
  calendarDurationFieldName: string
}

export type TToggleInputData = TInputData & {
  toggleLabel: string
  toggleCaption: string
}

type TComponentButton = TBaseStore & {
  type: BUTTON_TYPE
  label: string
  color?: string
  disable: boolean
  show?: boolean
  icon?: string
  closeDialog?: boolean
  outline?: boolean
  click?: () => null
}

export type TButtons = TComponentButton[]

type TToolbarButton = {
  label: string
  color?: string
  disable?: boolean
  loading?: boolean
  show?: boolean
  flat?: boolean
  icon?: string
  onClick?: (() => void) | null
}

export type TToolbarButtons = TToolbarButton[]

export type TTableData = {
  type: string
  // columns: TTableColumns
}

export type TTableOptions = {
  name: string
  value: unknown
}

export type TStringOrNull = string | null

export type TConfirmData = {
  label: string
  oldValue: string
  newValue: string
}

export type TSeries = {
  name: string
  data: Array<number | null>
}
