import { createStore } from 'vuex'
import ClientStore from './modules/ClientStore'
import NotificationStore from './modules/NotificationStore'

// Create Vuex store
const store = createStore({
  modules: {
    client: ClientStore,
    notification: NotificationStore,
  },
})

export default store