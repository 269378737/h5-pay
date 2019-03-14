
<script>
import MD5 from 'md5'
import { getQueryString } from '@/lib/lib'
import { PAYMENT_RESULT_POST } from '@/lib/api'
import { UPDATE_BAR_HEIGHT, LANGUAGE, UPDATE_TOKEN_ID, UPDATE_ORDER_ID} from '@/store/mutations-type'
export default {
  data () {
    return {
      loading: null
    }
  },
  beforeCreate () {
    /** 该文件暂时无用 */
    // 因为微信返回后不在原有Ip环境下，而是在微信认证的一个域名环境下，所以此时将拿不到IP环境下的缓存数据，这里将app传过来的数据在缓存一遍
    /**
     * 因为多服务器的原因，比如中国、美国、迪拜等地方都有服务器，为了让用户就近访问，服务器将根据用户所在地区就近分配服务器IP，用户就访问该IP上的资源
     * 因此在访问H5时也是通过IP访问对应服务器上的H5，但微信H5支付必须配置一个域名，在支付成功后会回跳到这个域名所在页面
     * 这时由于前面缓存的数据在以IP访问的地址上，微信支付回跳后界面无法拿到缓存数据，因此这里需要将数据重新缓存到域名访问的地址上
     * 
     * 注：该组件就是微信支付后回跳的页面
     */

    this.$i18n.locale = getQueryString('lang')
    if (this.isAndroid()) {
        // 安卓下因为是用的一个webview，所以回跳后拿不到缓存的状态栏高度数据，需要重新从app传递过来
        // 而IOS是开启了两个webview，微信支付的时候会打开第二个webview，支付完后会关闭第二个webview，这时第一个webview还是IP形式的地址，所以能拿到缓存数据
        this.$store.commit(UPDATE_BAR_HEIGHT, { statuBarHeight: getQueryString('height') })
    }
    this.$store.commit(UPDATE_ORDER_ID, { orderId: getQueryString('orderId') })
    this.$store.commit(LANGUAGE, { lang: getQueryString('lang') })
    this.$store.commit(UPDATE_TOKEN_ID, { token: getQueryString('token') })
  },
  created () {
      this.queryPayResult()
  },
  methods: {
      /**
       * 查询支付结果
       */
    queryPayResult () {
      this.loading = this.vmLoadingFull()
      let outTradeNo = getQueryString('outTradeNo')
      let token = getQueryString('token')
      let orderId = getQueryString('orderId')
      
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
          this.$router.push('/pay-result')
        } else if (data.body.trade_status === 2) {
          this.$router.push(`/pay-fail/${token}/${orderId}/${getQueryString('lang')}`)
        } else {
          if(this.isIOS()) {
            // IOS开了两个webview, 通知IOS微信支付失败，处理其中一个webview
            this.postMessageToIOS({ wechatPayFail: true })
          } else {
            this.$router.push('/orders-form/' + orderId + '/' + token)
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
<style scoped>
.container {
  text-align: center;
  overflow: unset;
}
.layout {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
  background: #fff;
  overflow: hidden;
  height: 100%;
}
.complete {
    padding-top: 5rem;
    padding-bottom: 1rem;
    font-size: 1.6rem;
    color: red;
    border-bottom: 1px solid #ccc;
    margin: 0 6rem;
}
.error {
    font-size: 1.6rem;
    padding-top: 1rem;
    color: #828282;
}
.title {
    padding-top: 10rem;
    font-size: 1.4rem;
}
</style>
