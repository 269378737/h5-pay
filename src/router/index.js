import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/home'
import OrdersFormComponent from '@/components/orders-form'
import PayFailComponent from '@/components/pay-fail'
import PaySuccessComponent from '@/components/pay-success'
import OrderToPayComponent from '@/components/order-to-pay.vue'
import OrderListsComponent from '@/components/order-lists.vue'
import PayResultComponent from '@/components/pay-result.vue'
import ProtocolCnComponent from '@/components/protocol-cn.vue'
import ProtocolEnComponent from '@/components/protocol-en.vue'
import PayResultWechatComponent from '@/components/pay-result-wechat.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: HomeComponent
    }, {
      path: '/orders-form/:id/:token',
      name: 'orders-form',
      component: OrdersFormComponent
    }, {
      path: '/pay-fail/:token/:orderId/:lang/:height',
      name: 'pay-fail',
      component: PayFailComponent
    }, {
      path: '/pay-success',
      name: 'pay-success',
      component: PayResultComponent
    }, {
      path: '/order-to-pay/:id/:token',
      name: 'order-to-pay',
      component: OrderToPayComponent
    }, {
      path: '/order-lists',
      name: 'order-lists',
      component: OrderListsComponent
    }, {
      path: '/pay-result/:lang/:height/:newuser',
      name: 'pay-result',
      component: PaySuccessComponent
    }, {
      path: '/protocol-cn',
      name: 'protocolCn',
      component: ProtocolCnComponent
    }, {
      path: '/protocol-en',
      name: 'protocolEn',
      component: ProtocolEnComponent
    }, {
      path: '/pay-result-wechat',
      name: 'payResultWechat',
      component: PayResultWechatComponent
    }
  ]
})
