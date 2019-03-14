import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import _ from 'underscore'
import VueI18n from 'vue-i18n'
import language from '@/lang'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommonApi from '@/lib/common-api'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(CommonApi)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
Vue.prototype.underscore = _
/* eslint-disable no-new */

// 暂时未使用，人民币符号在不同的移动操作系统上显示存在差异
const numberFormats = {
  en: {
    currency: {
      style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
    }
  },
  cn: {
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'symbol'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'zh',
  messages: language, // set locale messages
  // numberFormats
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
