import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MediatorService from '@/mediator/MediatorService';
import SocketManager from "@/mediator/SocketManager";
import APIManager from "@/mediator/APIManager";


const mediatorService = new MediatorService(
    new SocketManager(process.env.VUE_APP_SERVER_URL || 'http://localhost:8080'),
    new APIManager(process.env.VUE_APP_SERVER_URL || 'http://localhost:5000')
);


const app = createApp(App);
app.config.globalProperties.$mediator = mediatorService;
app.use(store).use(router).mount('#app');
