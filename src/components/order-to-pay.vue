<template>
  <div class="container">
    <el-row id="title" class="fixed-layout" v-show="isAndroid()">
      <el-col :span="24">
        <div class="nav-bar">
          <i class="el-icon-arrow-left" @click="backUrl"></i>
          <div class="title">{{ $t('OrderDetailTitle') }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row id="ordertab" class="module-container">
      <el-col :span="12" class="left-label">{{ $t('ServiceType') }}</el-col>
      <el-col :span="12" class="right-value">{{ serviceType }}</el-col>
    </el-row>

    <el-row class="module-container mt-20 list-title">
      <el-col :span="24">
        <p class="left-label">{{ $t('OpeningDevice') }}</p>
      </el-col>
    </el-row>
    <el-row class="module-container pd-top-bottom0">
      <el-col :span="24">
        <ul class="lists">
          <li v-for="(obj, index) in data.devices" :key="index">
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
          <el-col
            :span="12"
            class="left-label"
          >{{ data.orderStatus === orderStatus.SUCCESS ? '&nbsp;' : $t('NeedToPay') }}</el-col>
          <el-col :span="12" class="pay-right right-value" style="font-size: 18px">
            <span v-if="isPromotion">【促销价】</span>
            {{ data.payAmount }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="module-container mt-20 list-title">
      <el-col :span="24">
        <p class="left-label">{{ $t('OrderInfo') }}</p>
      </el-col>
    </el-row>
    <el-row class="module-container pd-top-bottom0" style="padding-bottom: 6rem !important;">
      <el-col :span="24">
        <el-row class="list-order-info">
          <el-col :span="8" class="left-label">{{ $t('OrderNumber') }}</el-col>
          <el-col :span="16" class="right-value">
            <div style="display: flex;align-items: center;float: right">
              <span class="order-number">{{ data.orderId }}</span>
              <!-- <span class="split"></span>
              <span class="order-num-copy" @click="clipboard(data.orderId)">{{ $t('Copy') }}</span>-->
            </div>
          </el-col>
        </el-row>
        <el-row class="list-order-info" v-if="data.orderStatus === orderStatus.SUCCESS">
          <el-col :span="8" class="left-label">{{ $t('OrderStatus') }}</el-col>
          <el-col :span="16" class="right-value success">{{ $t('PaySuccess') }}</el-col>
        </el-row>
        <el-row class="list-order-info" v-if="data.orderStatus === orderStatus.SUCCESS">
          <el-col :span="14" class="left-label">{{ $t('PayMethod') }}</el-col>
          <el-col :span="10" class="right-value">{{ data.payType }}</el-col>
        </el-row>
        <el-row class="list-order-info">
          <el-col :span="8" class="left-label">{{ $t('OrderTime') }}</el-col>
          <el-col :span="16" class="right-value">{{ data.createTime }}</el-col>
        </el-row>
        <el-row class="list-order-info" v-if="data.orderStatus === orderStatus.SUCCESS">
          <el-col :span="8" class="left-label">{{ $t('serveOpenTime') }}</el-col>
          <el-col :span="16" class="right-value">{{ data.paymentTime }}</el-col>
        </el-row>
        <el-row class="list-order-info" v-if="data.orderStatus === orderStatus.SUCCESS">
          <el-col :span="8" class="left-label">{{ $t('ValidityPeriod') }}</el-col>
          <el-col :span="16" class="right-value">{{ $t('To') }} {{ data.expireTime }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="fixed-button-docker" v-if="data.orderStatus === orderStatus.WAITING">
      <el-button class="cancel" @click="cancelOrder">{{ $t('CancelOrder') }}</el-button>
      <el-button class="confirm" @click="submitPayForm">{{ $t('PayNow') }}</el-button>
    </div>
  </div>
</template>
<script>
import { orderStatus } from "@/lib/const";
import {
  dateFormat,
  transformPayType,
  formatMoney,
  transformTime
} from "@/lib/lib";
import {
  ORDER_QUERY_POST,
  DEVICE_INFO_POST,
  GOOD_INFO_POST,
  EXPIRE_SERVE_POST,
  ORDER_CANCEL_POST,
  GOOD_CLASS_QUERY_POST
} from "@/lib/api";
export default {
  data() {
    return {
      orderId: "",
      token: "",
      data: {
        itemClass: "",
        orderId: "",
        orderStatus: "",
        payType: "",
        createTime: "",
        expireTime: "",
        paymentTime: "",
        payAmount: "",
        devices: []
      },
      orderStatus: orderStatus,
      loading: null,
      goodClasses: [],
      isPromotion: false
    };
  },
  created() {
    this.loading = this.vmLoadingFull();
    this.orderId = this.$route.params.id;
    this.token = this.$route.params.token;
    this.orderQuery();
    this.goodClassQuery();
    if(!this.isAndroid()) {
      this.postMessageToIOS({ navTitle: this.$t("OrderDetailTitle") });
    }
  },
  mounted() {
    this.layoutStatuBar(this.$store.getters.getBarHeight);
    this.$i18n.locale = this.$store.getters.getLanguage;
  },
  computed: {
    serviceType() {
      if (!this.data.itemClass) {
        return "-";
      }

      const a = this.goodClasses.find(
        o => o.class_name === this.data.itemClass
      );
      if (a) {
        return a.class_desc;
      } else {
        return "-";
      }
    }
  },
  methods: {
    /** 订单查询 */
    orderQuery() {
      const postData = {
        access_token: this.token,
        status: "",
        time_start: "",
        time_end: "",
        page: 1,
        page_size: 10,
        order_id: this.orderId
      };
      this.$http.post(ORDER_QUERY_POST, postData).then(res => {
        this.loading.close();
        let data = res.data;
        if (data.code_msg) {
          return this.toast(this.$t("GetOrderError"));
        }
        if (
          !data.body ||
          !data.body.orderinfo ||
          data.body.orderinfo.length === 0
        ) {
          return this.toast(this.$t("NoData"));
        }
        this.isPromotion = data.body.orderinfo[0].item[0].item_pro_id;
        this.createData(data.body.orderinfo[0]);
      }).catch(e => {
        this.loading.close();
        this.toast(this.$t("appError") + ": " + e);
      })
    },

    /** 商品类型查询 */
    goodClassQuery() {
      const postData = {
        access_token: this.token
      };
      this.$http.post(GOOD_CLASS_QUERY_POST, postData).then(res => {
        this.goodClasses = res.data.body.classinfo;
      }).catch(e => {
        this.toast(this.$t("appError") + "【goodClassQuery】: " + e);
        reject();
      })
    },

    /** 生成渲染数据 */
    createData(order) {
      let devices = [];
      order.item.forEach(o => {
        Promise.all([
          this.getGoodsInfo(o.item_id),
          this.getDeviceInfo(o.item_relation)
        ]).then(result => {
          devices.push({
            deviceName: result[1] ? result[1].device_name || " - " : " - ",
            devicePic: result[1].pic1_fileid,
            params: result[0]
              ? `${this.$t("Specification")}：${result[0].goods_name +
                  this.$t("Hours")}  ${formatMoney(
                  result[0].price,
                  result[0].unit
                )}/${this.$t(transformTime(result[0].goods_lasteddate))}`
              : "-"
          });
        });
      });
      this.getServiceInfo(order.item[0].item_relation).then(result => {
        this.data.expireTime = this.dateFormat(result.expiration * 1000);
      });
      this.data.itemClass = order.item[0].item_class;
      this.data.orderId = this.orderId;
      this.data.orderStatus = order.status;
      this.data.payType = this.$t(transformPayType(order.pay_type));
      this.data.createTime = this.dateFormat(order.create_time);
      this.data.paymentTime = this.dateFormat(order.payment_time * 1000);
      this.data.payAmount = formatMoney(order.total_amount, order.unit);
      this.data.devices = devices;
      this.loading.close();
    },

    dateFormat(millseconds) {
      let date = millseconds ? new Date(millseconds) : new Date();
      return dateFormat(date, "yyyy-MM-dd hh:mm:ss");
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

    /** 获取用户购买服务过期时间 */
    getServiceInfo(deviceId) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(EXPIRE_SERVE_POST, {
            access_token: this.token,
            device_id: [deviceId]
          })
          .then(res => {
            if (res.data.code_msg) {
              return resolve();
            }
            let data = res.data.body.cfg;

            if (!data || data.length <= 0) {
              return resolve();
            }
            resolve(data[0]);
          });
      });
    },

    submitPayForm() {
      this.$router.push("/orders-form/" + this.orderId + "/" + this.token);
    },
    cancelOrder() {
      if (confirm(this.$t("ConfirmCancelOrder"))) {
        this.loading = this.vmLoadingFull();
        this.$http
          .post(ORDER_CANCEL_POST, {
            access_token: this.token,
            order_id: this.orderId
          })
          .then(res => {
            this.loading.close();
            let data = res.data;
            if (data.code_msg) {
              this.toast(this.$t("CancelOrderError"));
              return;
            }
            this.$router.push("/order-lists");
          })
          .catch(e => {
            this.toast(this.$t("appError") + "【cancelOrder】: " + e);
          });
      }
    },

    clipboard(data) {
      if (this.isAndroid()) {
        javascript: android.setClipBoard(data);
      } else {
        this.postMessageToIOS({ toClipboard: true, orderId: data });
      }
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
      this.$router.push("/order-lists");
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
  font-size: 1.6rem;
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

.pay-right {
  color: #daaa76;
}
</style>