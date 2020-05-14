import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import VueClipboard from 'vue-clipboard2'


Vue.prototype.$api = Axios
global.browser = require('webextension-polyfill')
Vue.prototype.$browser = global.browser

const opts = {
}
Vue.use(Vuetify)

Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(opts),

  render: h => h(App)
})
