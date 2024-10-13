import { createStore } from 'vuex'
import ClientStore from './modules/ClientStore'
import ErrorsStore from './modules/ErrorsStore'

// Create Vuex store
const store = createStore({
  modules: {
    client: ClientStore,
    errors: ErrorsStore,
  },
})

export default store