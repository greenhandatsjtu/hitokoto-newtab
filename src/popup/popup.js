import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

global.browser = require('webextension-polyfill')
Vue.prototype.$browser = global.browser
Vue.prototype.$api = Axios

const opts = {
}
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(opts),
  render: h => h(App)
})
