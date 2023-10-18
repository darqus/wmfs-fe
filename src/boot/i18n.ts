import { createI18n, } from 'vue-i18n'

import { boot, } from 'quasar/wrappers'

import messages from 'src/i18n'

const currentLocale = Object.keys(messages)[0]

export type MessageLanguages = keyof typeof messages

// Type-define 'ru-RU' as the master schema for the resource
export type MessageSchema = (typeof messages)['ru-RU']

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition

declare module 'vue-i18n' {
  // define the locale messages schema
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefineDateTimeFormat {
    short: {
      hour: string
      minute: string
      second: string
      timeZoneName: string
      timezone: string
    }
    shortDate: {
      day: string
      month: string
    }
    longDate: {
      day: string
      month: string
    }
  }

  // define the number format schema
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefineNumberFormat {
    currency: {
      style: string
      currencyDisplay: string
      currency: string
    }
    twoFractionDigitsNumber: {
      minimumFractionDigits: number
      maximumFractionDigits: number
    }
    threeFractionDigitsNumber: {
      minimumFractionDigits: number
      maximumFractionDigits: number
    }
  }
}

const datetimeFormat = {
  short: {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: ' ',
    timezone: 'Europe/Moscow',
  },
  shortDate: {
    day: 'numeric',
    month: 'short',
  },
  longDate: {
    day: 'numeric',
    month: 'long',
  },
}

const datetimeFormats = {
  [currentLocale]: datetimeFormat,
}

const numberFormats = {
  [currentLocale]: {
    currency: {
      style: 'currency',
      currencyDisplay: 'symbol',
      currency: 'Rub',
    },
    twoFractionDigitsNumber: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    threeFractionDigitsNumber: {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    },
  },
}

export const i18n = createI18n({
  locale: currentLocale,
  legacy: false,
  messages,
  datetimeFormats,
  numberFormats,
})

export default boot(({ app, }) => {
  // Set i18n instance on app
  app.use(i18n)
})
