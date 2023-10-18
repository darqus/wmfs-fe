import { boot, } from 'quasar/wrappers'

import { useStoreNsiTypes, } from 'src/stores/store-nsi-types'

const nsiTypesStore = useStoreNsiTypes()

export default boot(() => {
  nsiTypesStore.getNsiTypes()
})
