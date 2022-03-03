import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Layer, Toast, Icons } from '../packages'


createApp(App).use(store).use(router).use(Layer).use(Toast).use(Icons).mount('#app')
