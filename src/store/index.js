import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { UPDATE_TOKEN_ID, UPDATE_BAR_HEIGHT, UPDATE_ORDER_ID, ORDER_LIST_TAB, LANGUAGE, UPDATE_BILL_ID } from '@/store/mutations-type'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', 
  storage: window.sessionStorage
})

const store = new Vuex.Store({
  state: {
    token: '',
    deviceId: '',
    orderId: '',

    // 保存订单列表页当前是那个标签-- 已支付、待支付、已取消
    orderListTab: '0',

    // 状态栏高度
    statuBarHeight: 0,

    // 语言
    lang: '',

    // 订单流水号
    billId: ''
  },
  mutations: {
    [UPDATE_TOKEN_ID] (state, payload) {
      state.token = payload.token
      state.deviceId = payload.deviceId
    },

    [UPDATE_BAR_HEIGHT] (state, payload) {
      state.statuBarHeight = payload.statuBarHeight
    },

    [UPDATE_ORDER_ID] (state, payload) {
      state.orderId = payload.orderId
    },

    [ORDER_LIST_TAB] (state, payload) {
      state.orderListTab = payload.orderListTab
    },
    [LANGUAGE] (state, payload) {
      state.lang = payload.lang
    },
    [UPDATE_BILL_ID] (state, payload) {
      state.billId = payload.billId
    }
  },

  getters: {
    getTokenAndDeviceId (state) {
      return {
        deviceId: state.deviceId,
        token: state.token
      }
    },
    getBarHeight (state) {
      return state.statuBarHeight
    },

    getOrderId (state) {
      return state.orderId
    },

    getOrderTab (state) {
      return state.orderListTab
    },
    getLanguage (state) {
      return state.lang
    },
    getBillId (state) {
      return state.billId
    }
  },
  plugins: [ vuexLocalStorage.plugin ]
})

export default store
