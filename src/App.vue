<!-- 本项目如有必要，请后来者使用Framework7或者Ionic框架重构一遍 -->
<template>
  <div id="app">
    <div class="statu-bar"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/css/style.css'
import { UPDATE_TOKEN_ID } from '@/store/mutations-type'
export default {
  name: 'App',
  mounted () {
    window.jsBackToDevice = this.jsBackToDevice
  },
  methods: {
    // 解决在支付成功或失败页面实体键无法返回的问题
    jsBackToDevice () {
      if (this.$route.name === 'pay-fail') {
        let token = this.$route.params.token
        let orderId = this.$route.params.orderId
        if(this.isIOS()) {
          // IOS开了两个webview, 通知IOS微信支付失败，处理其中一个webview
          this.postMessageToIOS({ wechatPayFail: true })
        }
        this.$router.push('/orders-form/' + orderId + '/' + token)
      } else if (this.$route.name === 'pay-result') {
        this.$store.commit(UPDATE_TOKEN_ID, { token: '', deviceId: '' })
        if (this.isAndroid()) {
          javascript:android.exitActivity()
        } else {
          this.postMessageToIOS({ isCloseWebView: true })
        }
      } else {
        this.$router.back()
      }
    } 
  }
}
</script>

<style>
html {
  font-size: 12px;
  font-family: '苹方';
}
body {
  margin: 0;
}
html, body {
  height: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {
  min-height: 100%;
  background: #f1f1f1;
}
.statu-bar {
  background: #fff;
  position: fixed;
  z-index: 1;
  width: 100%;
}
</style>

