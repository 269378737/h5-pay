<template>
  <div class="container">
    <div class="layout">
      <el-row id="title" class="fixed-layout" v-show="isAndroid()">
        <el-col :span="24">
          <div class="nav-bar">
            <!--<i class="el-icon-arrow-left" @click="backUrl"></i>-->
            <div class="title">{{ $t('PayResultTitle') }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="error-icon">
          <img src="../assets/img/ic_paymentfailed.png"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="error-tip">
          {{ $t('PayResultFail') }}
        </el-col>
      </el-row>
      <div class="toolbar" @click="submitPayForm">{{ $t('Retry') }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orderId: '',
        token: ''
      }
    },
    created () {
      this.token = this.$route.params.token
      this.orderId = this.$route.params.orderId
      if(!this.isAndroid()) {
        this.postMessageToIOS({ navTitle: this.$t("PayResultTitle") });
      }
    },
    mounted () {
      this.layoutStatuBar(this.$route.params.height)
      this.$i18n.locale = this.$route.params.lang
    },
    methods: {
      submitPayForm () {
        if(this.isIOS()) {
          // IOS开了两个webview, 通知IOS微信支付失败，处理其中一个webview
          this.postMessageToIOS({ wechatPayFail: true })
        }
        this.$router.push('/orders-form/' + this.orderId + '/' + this.token)
      },
      /** 设置导航布局 */
      layoutStatuBar (height) {
        document.getElementsByClassName('statu-bar')[0].style.height = height + 'px'

        let title = document.getElementById('title')
        title.style.paddingTop = height + 'px'
      },
    }
  }
</script>

<style scoped>
.container {
  text-align: center;
  overflow: unset;
}

.error-icon{
  padding: 8rem 0;
}
.error-tip {
  font-size: 1.6rem;
  padding-bottom: 2rem;
  color: #9d9d9d;
}

.toolbar {
  background: #f0d3b4;
  text-align: center;
  color: #fff;
  line-height: 5rem;
  height: 5rem;
  font-size: 2rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-weight: 300;
}
.layout {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
  background: #fff;
  overflow: hidden;
  height: 100%;
}
</style>