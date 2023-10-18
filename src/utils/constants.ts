import { type TTimePickerModel, type TDatePickerModel, type TPagination, } from 'src/types/components'

import { getTodayYesterdayDate, } from './datetime'
import { type TNsiType, } from '../stores/store-nsi-types'
import { NSI_TYPES, } from '../types/enums'

export const HEADER_STYLE_LINE_BREAK = 'white-space: unset;'

export const DEBOUNCE = 500

export const DATE_PICKER_DELIMETER = ' '

export const RANGE_PICKER_DELIMETER = ' - '

export const DEFAULT_ROWS_PER_PAGE = 10

export const DEFAULT_TIME_PICKER = '00:00'

export const DEFAULT_NSI_TYPE_ID = '80290'

export const DEFAULT_NSI_TYPE_LABEL = 'ЕФС-1'

export const ROWS_PER_PAGE_OPTIONS = [ DEFAULT_ROWS_PER_PAGE, 1.5 * DEFAULT_ROWS_PER_PAGE, 2 * DEFAULT_ROWS_PER_PAGE, ]

/**
 * Creates a pagination object with default values.
 *
 * @return {TPagination} The pagination object with default values.
 */
export const createPagination = (): TPagination => ({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  rowsNumber: 0,
})

/**
 * Creates a new instance of the TNsiType object.
 *
 * @return {TNsiType} The newly created TNsiType object.
 */
export const createCurrentNsiType = (): TNsiType => {
  const nsiTypeId = DEFAULT_NSI_TYPE_ID
  const label = DEFAULT_NSI_TYPE_LABEL
  const name = NSI_TYPES.MAIN

  return {
    nsiTypeId,
    label,
    name,
  }
}

const {
  yesterdayShort,
  todayShort,
} = getTodayYesterdayDate()

/**
 * Creates an initial date picker model.
 *
 * @return {TDatePickerModel} The initial date picker model.
 */
export const createInitialDatePickerModel = (): TDatePickerModel => {
  const yesterday = yesterdayShort
  const today = todayShort

  return {
    from: yesterday,
    to: today,
  }
}

/**
 * Creates an initial time picker model.
 *
 * @return {TTimePickerModel} The initial time picker model.
 */
export const createInitialTimePickerModel = (): TTimePickerModel => {
  return {
    from: DEFAULT_TIME_PICKER,
    to: DEFAULT_TIME_PICKER,
  }
}

/**
 * Returns the date picker values from the given model.
 *
 * @param {TDatePickerModel} model - The model containing the date picker values.
 * @return {[string, string]} - The date picker values [from, to].
 */
export const getDatePicker = (datePickerModel: TDatePickerModel): [string, string] => typeof datePickerModel === 'string' ? [ datePickerModel, datePickerModel, ] : [ datePickerModel?.from, datePickerModel?.to, ]

/**
 * Generates the input range string based on the given date picker model and time picker model.
 *
 * @param {TDatePickerModel} datePickerModel - The date picker model to use.
 * @param {TTimePickerModel} timePickerModel - The time picker model to use.
 * @return {string} The generated input range string.
 */
export const getInputRange = (datePickerModel: TDatePickerModel, timePickerModel: TTimePickerModel): string => {
  const datePicker = getDatePicker(datePickerModel)
  const from = timePickerModel?.from ?? DEFAULT_TIME_PICKER
  const to = timePickerModel?.to ?? DEFAULT_TIME_PICKER

  return `${datePicker[0]}${DATE_PICKER_DELIMETER}${from}${RANGE_PICKER_DELIMETER}${datePicker[1]}${DATE_PICKER_DELIMETER}${to}`
}

/**
 * Toggles the value of a param in the state object.
 *
 * @param {any} state - The state object.
 * @param {string} property - The name of the property to toggle. Defaults to 'loading'.
 * @return {void} This function does not return a value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toggleLoading = (state: any, property = 'loading'): void => {
  state[property] = !state[property]
}
