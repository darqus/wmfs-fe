import { defineStore, } from 'pinia'

import { API, } from 'src/types/api'
import { type NSI_TYPES, STORE_TYPES, } from 'src/types/enums'

// import { LocalStorageService, } from 'src/utils/localStorageService'

import { api, } from 'src/boot/axios'

import { type TBaseStore, } from '../types/components'
import { createCurrentNsiType, toggleLoading, } from '../utils/constants'

export type TNsiType = {
  name: NSI_TYPES
  label: string
  nsiTypeId: string
}

type TCurrentNsi = TNsiType

export type TNsiTypes = TNsiType[]

type TNsiTypeState = TBaseStore & {
  nsiTypes?: TNsiTypes
  currentNsi: TCurrentNsi
}

// const localStorageService = new LocalStorageService()

/**
 * Initializes the initial state of the NSI type.
 *
 * @return {TNsiTypeState} The initial state of the NSI type.
 */
const createInitialState = (): TNsiTypeState => ({
  loading: false,
  nsiTypes: [],
  currentNsi: createCurrentNsiType(),
})

export const useStoreNsiTypes = defineStore(STORE_TYPES.NSI_TYPES, {
  state: createInitialState,
  /* getters: {
    setCurrentNsi (state) {
      localStorageService.set(LOCAL_STORAGE_TYPES.CURRENT_NSI, { ...state.currentNsi, })
    },
  }, */
  actions: {
    getNsiTypes () {
      toggleLoading(this)
      api.get(API.getNsiTypes)
        .then(({ data, }: { data: TNsiType[] }) => {
          this.nsiTypes = data
          this.currentNsi = data[0]

          /* localStorageService.set(LOCAL_STORAGE_TYPES.NSI_TYPES, data)
          localStorageService.set(LOCAL_STORAGE_TYPES.CURRENT_NSI, data[0]) */
        })
        .finally(() => { toggleLoading(this) })
    },
  },
})
