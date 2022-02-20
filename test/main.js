import { createApp } from 'vue'
import App from './App.vue'

/* eslint-disable */
// import lanui from '../dist/lanli-ui.umd.min.js'
// import lanui from '../packages'
import lanliui from 'lanli-ui'
/* eslint-enable */

createApp(App).use(lanliui).mount('#app')
