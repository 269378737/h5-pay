
<script>
import MD5 from 'md5'
import { getQueryString } from '@/lib/lib'
import { PAYMENT_RESULT_POST } from '@/lib/api'
export default {
  data () {
    return {
      loading: null
    }
  },
  beforeCreate () {
    // 支付宝网页支付时，IOS跳转到支付成功页面是在第二个webview，因此无法拿到缓存的状态栏高度和语言数据，需要从IOS那边拼接到Url来获取
    this.$i18n.locale = this.$store.getters.getLanguage || getQueryString('lang')
  },
  created () {
    this.queryPayResult()
  },
  methods: {
    queryPayResult () {
      this.loading = this.vmLoadingFull()
      let outTradeNo = getQueryString('out_trade_no')
      let token = this.$store.getters.getTokenAndDeviceId.token || getQueryString('token')
      let orderId = this.$store.getters.getOrderId || getQueryString('orderId')
      let lang = this.$store.getters.getLanguage || getQueryString('lang')
      let height = this.$store.getters.getBarHeight || getQueryString('height')
      let time = Date.parse(new Date()) / 1000
      let data = {
        access_token: '',
        client_id: 'mktech',
        req_time: time,
        sign_key: MD5(time + '2017mktech!@01'),
        bill_id: outTradeNo,
        order_id: ''
      }
      this.$http.post(PAYMENT_RESULT_POST, data).then(res => {
        this.loading.close()
        let data = res.data
        if (data.code_msg) { this.toast(this.$t('PayResult')); return }
        if (data.body.trade_status === 1) {
          this.$router.push(`/pay-result/${lang}/${height}/${0}`)
        } else if (data.body.trade_status === 2) {
          this.$router.push(`/pay-fail/${token}/${orderId}/${lang}/${height}`)
        } else {
          if(this.isIOS()) {
            // IOS开了两个webview, 通知IOS微信支付失败，处理其中一个webview
            this.postMessageToIOS({ wechatPayFail: true })
          } else {
            this.$router.push(`orders-form/${orderId}/${token}`)
          }
        }
      }).catch((e) => {
        this.loading.close()
        this.toast(this.$t('appError') + ': ' + e);
      })
    }
  }
}
</script>
