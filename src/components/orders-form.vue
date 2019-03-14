<template>
  <div class="container">
    <el-row id="title" class="fixed-layout" v-show="isAndroid()">
      <el-col :span="24">
        <div class="nav-bar">
          <i class="el-icon-arrow-left" @click="backUrl"></i>
          <div class="title">{{ $t('OrderPayTitle') }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row id="ordertab" class="module-container">
      <el-col :span="12" class="left-label">{{ $t('ServiceType') }}</el-col>
      <el-col :span="12" class="right-value">{{serviceType}}</el-col>
    </el-row>

    <el-row class="module-container mt-20 list-title">
      <el-col :span="24">
        <p class="left-label">{{ $t('OpeningDevice') }}</p>
      </el-col>
    </el-row>
    <el-row class="module-container pd-top-bottom0">
      <el-col :span="24">
        <ul class="lists">
          <li v-for="(obj, index) in data" :key="index">
            <div class="left">
              <img class="pic" :src="obj.devicePic">
            </div>
            <div class="right">
              <p class="name">{{ obj.deviceName }}</p>
              <p class="desc">{{ obj.params }}</p>
            </div>
          </li>
        </ul>
        <el-row class="module-container pd0-left-right">
          <el-col :span="12" class="left-label">{{ $t('NeedToPay') }}</el-col>
          <el-col :span="12" class="pay-right right-value" style="font-size: 18px"><span v-if="isPromotion">【促销价】</span>{{ amount }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="module-container mt-20 list-title">
      <el-col :span="24">
        <p class="left-label">{{ $t('SelectPayWay') }}</p>
      </el-col>
    </el-row>
    <el-row class="row-layout pd-top-bottom0" style="padding-bottom: 8rem !important;">
      <el-col :span="24">
        <ul class="lists lists-pay">
          <li @click="selectedPayWay(payWay.wechat)" v-if="unit === 'CNY' || unit === 'HKD'">
            <div class="left">
              <img src="../assets/img/ic_weixin.png">
            </div>
            <div class="right pay-way">
              <p class="name">{{ $t('PayWithWechat') }}</p>
            </div>
            <div class="right select">
              <el-radio v-model="payWayChecked" :label="payWay.wechat">&nbsp;</el-radio>
            </div>
          </li>
          <li @click="selectedPayWay(payWay.alipay)" v-if="unit === 'CNY' || unit === 'HKD'">
            <div class="left">
              <img src="../assets/img/ic_zhifubao.png">
            </div>
            <div class="right pay-way">
              <p class="name">{{ $t('PayWithAliPay') }}</p>
            </div>
            <div class="right select">
              <el-radio v-model="payWayChecked" :label="payWay.alipay">&nbsp;</el-radio>
            </div>
          </li>
          <li
            @click="selectedPayWay(payWay.paypal)"
            v-if="unit && unit !== 'CNY' && unit !== 'HKD'"
          >
            <div class="left">
              <img src="../assets/img/ic_paypal.png">
            </div>
            <div class="right pay-way">
              <p class="name">{{ $t('PayWithPayPal') }}</p>
            </div>
            <div class="right select">
              <el-radio v-model="payWayChecked" :label="payWay.paypal">&nbsp;</el-radio>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="fixed-button" @click="submitPayForm">{{ $t('ConfirmPayment') }}</div>
  </div>
</template>
<script>
import MD5 from "md5";
import { payAPI, paymentType, paymentWay, serviceType } from "@/lib/const";
import { formatMoney, transformTime } from "@/lib/lib";
import { UPDATE_ORDER_ID, UPDATE_BILL_ID } from "@/store/mutations-type";
import {
  ORDER_QUERY_POST,
  DEVICE_INFO_POST,
  GOOD_INFO_POST,
  PAYMENT_API_POST,
  PAYMENT_RESULT_POST,
  GOOD_CLASS_QUERY_POST
} from "@/lib/api";
export default {
  data() {
    return {
      // 支付方式：支付宝 - 1 , 微信 - 2 , paypal - 3
      payWayChecked: -1,
      orderId: "",
      token: "",
      data: [],
      orderInfo: {},
      // 支付方式常量定义
      payWay: paymentType,
      deviceImg: {},
      loading: null,
      itemClass: "",
      isPromotion: false,
      goodClasses: [],
      unit: "" // 根据货币类型确定使用那种支付方式
    };
  },
  computed: {
    isBtnDisabled() {
      return (
        !this.isSelectedRecord || !this.isSelectedTime || !this.protocolChecked
      );
    }
  },
  created() {
    this.loading = this.vmLoadingFull();
    // let orderId = this.$store.getters.getOrderId
    // let data = this.$store.getters.getTokenAndDeviceId
    // if (data && orderId) {
    //   this.orderId = orderId
    //   this.token = data.token
    // } else {
    this.orderId = this.$route.params.id;
    this.token = this.$route.params.token;
    // this.$store.commit(UPDATE_ORDER_ID, { orderId: this.orderId })
    // }
    this.orderQuery();
    this.goodClassQuery();
    if(!this.isAndroid()) {
      this.postMessageToIOS({ navTitle: this.$t("OrderPayTitle") });
    }
  },
  computed: {
    amount() {
      if (Object.keys(this.orderInfo).length <= 0) {
        return 0;
      }
      return formatMoney(
        this.orderInfo.total_amount,
        this.orderInfo.item[0].unit
      );
    },
    serviceType() {
      if (!this.itemClass) {
        return "-";
      }
      const a = this.goodClasses.find(o => o.class_name === this.itemClass);
      if (a) {
        return a.class_desc;
      } else {
        return "-";
      }
    }
  },

  mounted() {
    window.jsQueryPayResult = this.jsQueryPayResult;
    this.layoutStatuBar(this.$store.getters.getBarHeight);
    this.$i18n.locale = this.$store.getters.getLanguage;
  },
  methods: {
    /** 创建渲染数据 */
    createData(order) {
      order.item.forEach(o => {
        Promise.all([
          this.getGoodsInfo(o.item_id),
          this.getDeviceInfo(o.item_relation)
        ]).then(res => {
          this.unit = res[0].unit;
          this.data.push({
            deviceName: res[1] ? res[1].device_name || " - " : "-",
            devicePic: res[1].pic1_fileid,
            params: res[0]
              ? `${this.$t("Specification")}：${res[0].goods_name +
                  this.$t("Hours")}  ${formatMoney(
                  res[0].price,
                  res[0].unit
                )}/${this.$t(transformTime(res[0].goods_lasteddate))}`
              : "-"
          });
        });
      });
    },

    /** 订单查询 */
    orderQuery() {
      this.loading = this.vmLoadingFull();
      this.$http
        .post(ORDER_QUERY_POST, {
          access_token: this.token,
          status: "",
          time_start: "",
          time_end: "",
          page: 1,
          page_size: 10,
          order_id: this.orderId
        })
        .then(res => {
          this.loading.close();
          let data = res.data;
          if (data.code_msg) {
            this.toast(this.$t("GetOrderError"));
            return;
          }
          if (
            !data.body ||
            !data.body.orderinfo ||
            data.body.orderinfo.length === 0
          ) {
            this.toast(this.$t("NoData"));
            return;
          }
          this.orderInfo = data.body.orderinfo[0];
          this.itemClass = this.orderInfo.item[0].item_class;
          this.isPromotion = this.orderInfo.item[0].item_pro_id;
          this.createData(data.body.orderinfo[0]);
        });
    },

    /** 获取设备 */
    getDeviceInfo(deviceId) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(DEVICE_INFO_POST, {
            access_token: this.token,
            device_id: deviceId,
            sub_device_id: ""
          })
          .then(res => {
            if (res.data.code_msg) {
              return resolve();
            }
            resolve(res.data.body);
          })
          .catch(e => {
            this.toast(this.$t("appError") + "【getDeviceInfo】: " + e);
            reject();
          });
      });
    },

    /** 获取商品 */
    getGoodsInfo(goodId) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(GOOD_INFO_POST, {
            access_token: this.token,
            device_id: "",
            page: 1,
            page_size: "",
            is_onsale: 1, //商品是否可售，1不可售卖2可售
            class_id: "", // 云存储类别 阿里云、亚马逊等 3种
            goods_id: goodId //有值查询具体，没有则返回满足其他条件的所有
          })
          .then(res => {
            if (res.data.code_msg) {
              return resolve();
            }
            let goods = res.data.body.goodsInfo;

            if (!goods || goods.length <= 0) {
              return resolve();
            }
            resolve(goods[0]);
          })
          .catch(e => {
            this.toast(this.$t("appError") + "【getGoodsInfo】: " + e);
            reject();
          });
      });
    },

    selectedPayWay(way) {
      this.payWayChecked = way;
    },

    /** 商品类型查询 */
    goodClassQuery() {
      this.$http
        .post(GOOD_CLASS_QUERY_POST, {
          access_token: this.token
        })
        .then(res => {
          this.goodClasses = res.data.body.classinfo;
        })
        .catch(e => {
          this.toast(this.$t("appError") + "【goodClassQuery】: " + e);
          reject();
        });
    },

    submitPayForm() {
      if (this.payWayChecked === -1) {
        this.toast(this.$t("SelectPayWay"));
        return;
      }
      this.loading = this.vmLoadingFull();

      let data = {
        access_token: this.token,
        is_test: this.payWayChecked == 3 ? 2 : 1, // 是否测试 1：是， 2： 否
        service_type: serviceType.cloudStorage, // 商品类型 --> 1： 云存储
        order_id: this.orderId,
        currency: this.unit, // 货币类型
        payment_type: this.payWayChecked, // 支付类型 --> 1:支付宝 2: 微信 3:paypal
        sub_payment_type: paymentWay.H5, // 支付方式 --> 3：h5支付  其他支付方式：2:app支付、扫码支付 可以暂时写死
        trade_amount: this.orderInfo.total_amount / 10 / 10, // 支付金额
        notify_url: "",
        return_url: ""
      };
      this.$http({
        method: "post",
        url: PAYMENT_API_POST,
        data: data
      })
        .then(res => {
          this.loading.close();
          if (res.data.code === 51009) {
            // 判断是否重复支付
            return this.toast(this.$t("doNotRepeatPay"));
          }
          let payUrl =
            this.payWayChecked === paymentType.alipay
              ? payAPI.alipay
              : this.payWayChecked === paymentType.wechat
              ? payAPI.wechat
              : this.payWayChecked === paymentType.paypal
              ? payAPI.paypal
              : "";
          this.$store.commit(UPDATE_BILL_ID, { billId: res.data.body.bill_id });

          if (this.isIOS()) {
            this.postMessageToIOS({ orderId: this.orderId });
          }

          if (this.payWayChecked === paymentType.wechat) {
            window.location.href = res.data.body.payment_info;
          } else {
            let form = document.createElement("form");
            form.action = payUrl + res.data.body.payment_info;
            form.method = "post";
            document.body.appendChild(form);
            form.submit();
          }
        })
        .catch(e => {
          this.loading.close();
          this.toast(this.$t("appError") + "【submitPayForm】: " + e);
        });
    },
    // app端在支付结束后调用查询支付结果
    jsQueryPayResult() {
      this.loading = this.vmLoadingFull();
      let outTradeNo = this.$store.getters.getBillId;
      let time = Date.parse(new Date()) / 1000;
      let data = {
        access_token: "",
        client_id: "mktech",
        req_time: time,
        sign_key: MD5(time + "2017mktech!@01"),
        bill_id: outTradeNo,
        order_id: ""
      };
      this.$http
        .post(PAYMENT_RESULT_POST, data)
        .then(res => {
          this.loading.close();
          let data = res.data;
          if (data.code_msg) {
            this.toast(this.$t("PayResult"));
            return;
          }
          if (data.body.trade_status === 1) {
            this.$router.push(
              `/pay-result/${this.$store.getters.getLanguage}/${
                this.$store.getters.getBarHeight
              }/${0}`
            );
          } else if (data.body.trade_status === 2) {
            this.$router.push(
              `/pay-fail/${this.$store.getters.getTokenAndDeviceId.token}/${
                this.$store.getters.getOrderId
              }/${this.$store.getters.getLanguage}`
            );
          }
        })
        .catch(e => {
          this.loading.close();
          this.toast(this.$t("appError") + "【jsQueryPayResult】: " + e);
        });
    },

    /** 设置导航布局 */
    layoutStatuBar(height) {
      document.getElementsByClassName("statu-bar")[0].style.height =
        height + "px";

      let title = document.getElementById("title");
      title.style.paddingTop = height + "px";

      let ordertab = document.getElementById("ordertab");
      let paddingTop = document.defaultView.getComputedStyle(ordertab, null)[
        "padding-top"
      ];

      ordertab.style.paddingTop =
        title.getBoundingClientRect().height +
        parseFloat(paddingTop.replace("px", "")) +
        "px";
    },

    backUrl() {
      this.$router.back();
      // this.$router.push('/order-to-pay/' + this.orderId + '/' + this.token)
    }
  }
};
</script>

<style scoped>
.mt-20 {
  margin-top: 1.67rem;
}
.pd-top-bottom0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.title {
  font-weight: bold;
  color: #4a4a4a;
}

.align-right {
  text-align: right;
}
.align-center {
  text-align: center;
}
.row-layout {
  padding: 1rem 1.33rem;
  font-size: 1.24rem;
  background: #fff;
}
.left-title,
.right-desc {
  margin: 0.5rem 0;
  color: #4a4a4a;
}
.list-title {
  border-bottom: 1px solid #ccc;
}
.lists li {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-right: -1.33rem;
  padding: 0.33rem 0;
  position: relative;
}
.lists-pay li:last-child {
  border-bottom: none;
}
.lists .left,
.lists .right {
  display: inline-block;
  margin-left: 1rem;
}
.lists .right .name {
  color: #4a4a4a;
  font-size: 1.5rem;
}
.lists .right .desc {
  color: #9d9d9d;
  font-size: 1.44rem;
}
.pay-right {
  color: #daaa76;
}
.pay-way {
  display: flex !important;
  align-items: center;
}
.select {
  position: absolute;
  right: 1.33rem;
  top: 1.8rem;
}
.el-radio {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.el-radio /deep/ .el-radio__inner {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.el-radio /deep/ .el-radio__input.is-checked .el-radio__inner {
  background-color: #daaa76;
  border-color: #daaa76;
}
.el-radio /deep/ .el-radio__inner::after {
  height: 12px;
  left: 11px;
  top: 6px;
  width: 6px;
  box-sizing: content-box;
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  position: absolute;
  transform: rotate(45deg) scale(1);
  -webkit-transform: rotate(45deg) scale(1);
  border-radius: 0;
  background-color: transparent;
}
.el-radio /deep/ .el-radio__input.is-checked .el-radio__inner:after {
  transform: translate(0) scale(1) rotate(45deg) !important;
}
</style>