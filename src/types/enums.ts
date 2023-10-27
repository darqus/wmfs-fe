const { VITE_ROUTER_BASE, } = import.meta.env

export enum ROUTE_TYPE {
  PROCESSES = 'PROCESSES',
  HISTORY = 'HISTORY',
  STATISTIC = 'STATISTIC',
  SEARCH = 'SEARCH',
  HELP = 'HELP',
  INFO = 'INFO',
}

export enum ROUTE_NAME {
  HOME = 'Главная',
  PROCESSES = 'Все процессы',
  HISTORY = 'История',
  STATISTIC = 'Статистика',
  SEARCH = 'Поиск',
  HELP = 'Справка',
  INFO = 'Информация',
}

export enum STORE_TYPES {
  NSI_TYPES = 'nsi-types',
  HOME = 'home-page',
  PROCESSES = 'processes-page',
  HISTORY = 'history-page',
  STATISTIC = 'statistic-page',
  SEARCH = 'search-page',
  HELP = 'help-page',
  INFO = 'info-page',
}

export enum NSI_TYPES {
  MAIN = 'MAIN', // ЕФС-1
  DSV3 = 'DSV3', // ДСВ-3
  SZIFSS = 'SZIFSS', // СЗИ-ФСС
  SZVBUDZH = 'SZVBUDZH', // СЗВ-БЮДЖ
  SZVTD = 'SZVTD', // СЗВ-ТД-ЕФС
  SZVST = 'SZVST', // СЗВ-СТАЖ-ЕФС
  ODV1 = 'ODV1', // ЕФС-ОДВ-1
}

/* export enum LOCAL_STORAGE_KEYS {

} */

export enum COMPONENT_TYPE {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  DATE_PICKER = 'DATE_PICKER',
  RANGE_PICKER = 'RANGE_PICKER',
  GROUP = 'GROUP',
  PARENT_WITH_GROUP = 'PARENT_WITH_GROUP',
  PERIOD = 'PERIOD',
  TOGGLE_INPUT = 'TOGGLE_INPUT',
  CONFIRM_DATA = 'CONFIRM_DATA',
  DOUBLE_READONLY_FIELDS = 'DOUBLE_READONLY_FIELDS'
}

export enum INPUT_TYPE {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEL = 'tel',
  TEXTAREA = 'textarea',
  SEARCH = 'search',
  FILE = 'file',
  URL = 'url',
  TIME = 'time',
  DATE = 'date'
}

export enum BUTTON_TYPE {
  SUBMIT = 'submit',
  RESET = 'reset',
}

type Routes = Record<string, string>

const initRoutes: Routes = {}

const ROUTE_PATH = Object.keys(ROUTE_TYPE)
  .reduce((acc: Routes, route: string) => ({ ...acc, [route.toUpperCase()]: `${VITE_ROUTER_BASE}${route.toLowerCase()}`, })
    , initRoutes)

export { VITE_ROUTER_BASE, ROUTE_PATH, }
