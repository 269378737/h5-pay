<template>
  <div class="container">
    <el-row id="title" class="fixed-layout" style="z-index:2;transform: translateZ(0);" v-show="isAndroid()">
      <el-col :span="24">
        <div class="nav-bar">
          <i class="el-icon-arrow-left" @click="closeWebView"></i>
          <div class="title">{{ $t('OrderListTitle') }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row id="ordertab" class="fixed-layout" style="transform: translateZ(0);">
      <el-col :span="24">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :disabled="!isTabCanClick"
        >
          <el-menu-item index="0" :disabled="!isTabCanClick">{{ $t('AllOrder') }}</el-menu-item>
          <el-menu-item
            :index="orderStatus.WAITING + ''"
            :disabled="!isTabCanClick"
          >{{ $t('WaitingToPay') }}</el-menu-item>
          <el-menu-item
            :index="orderStatus.SUCCESS + ''"
            :disabled="!isTabCanClick"
          >{{ $t('Paid') }}</el-menu-item>
          <el-menu-item
            :index="orderStatus.CANCELLED + ''"
            :disabled="!isTabCanClick"
          >{{ $t('Expired') }}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row id="orderlist">
      <el-col :span="24" v-for="(item, index) in data" :key="index">
        <div class="order-lists" @click="routeJump(item.orderId, item.deviceName)">
          <el-row class="module-container">
            <el-col :span="8" class="left-label">{{ $t('OrderNumber') }}</el-col>
            <el-col :span="16" class="right-value">{{item.orderId}}</el-col>
          </el-row>
          <el-row class="order-name">
            <el-col :span="24">{{ item.deviceName }}</el-col>
          </el-row>

          <el-row class="order-params">
            <el-col :span="8" class="left">{{ $t('OrderStatus') }}</el-col>
            <el-col
              :span="16"
              class="right success"
              :class="item.orderStatusStyle"
            >{{ item.orderStatus }}</el-col>
          </el-row>
          <el-row class="order-params">
            <el-col :span="6" class="left">{{ $t('OrderTime') }}</el-col>
            <el-col :span="18" class="right">{{ item.createTime }}</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24" v-if="data.length === 0 && !isGetData">
        <p style="text-align: center; color: #ccc;padding-bottom: 10px">{{ $t('NoData') }}</p>
      </el-col>
      <el-col :span="24" v-if="data.length === totalData">
        <p style="text-align: center; color: #ccc;padding-bottom: 10px">{{ $t('InBottom') }}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { orderStatus } from "@/lib/const";
import {
  UPDATE_TOKEN_ID,
  UPDATE_BAR_HEIGHT,
  ORDER_LIST_TAB,
  LANGUAGE
} from "@/store/mutations-type";
import { DEVICE_INFO_POST, ORDER_QUERY_POST } from "@/lib/api";
import {
  transformTime,
  transformStandard,
  transformPayStatus,
  transformPayClass,
  dateFormat,
  getQueryString
} from "@/lib/lib";
export default {
  data() {
    return {
      orderStatus: orderStatus,
      activeIndex: "0",
      data: [],
      tempOrderList: [],
      token: "",
      isGetData: false,
      page: 1,
      unit: "",
      totalData: -1,
      status: "",
      // 判断是否可点击tab，用于在token还未传过来时用户就点击tab造成的错误
      isTabCanClick: false
    };
  },
  created() {
    // app端载入时存在lang参数，前端路由跳转无lang参数，避免前端路由返回时无lang参数报错
    if (!this.$store.getters.getLanguage) {
      const lang = getQueryString("lang");
      if (!lang) return;

      this.lang = lang;
      this.$i18n.locale = lang;
      this.$store.commit(LANGUAGE, { lang: lang });
    }
    if(!this.isAndroid()) {
      this.postMessageToIOS({ navTitle: this.$t("OrderListTitle") });
    }
  },
  mounted() {
    window.onscroll = () => {
      if (
        this.scrollTop() + this.windowHeight() >=
        this.documentHeight() - 50
      ) {
        if (this.isGetData || this.data.length === this.totalData) {
          return;
        }
        this.page += 1;
        this.orderQuery(this.status);
      }
    };

    // 挂载到全局，IOS端调用才不会报错
    window.jsGetTokenAndDeviceID = this.jsGetTokenAndDeviceID;
    window.jsGetWebViewOut = this.jsGetWebViewOut;

    let data = this.$store.getters.getTokenAndDeviceId;
    let height = this.$store.getters.getBarHeight;
    let lang = this.$store.getters.getLanguage;
    this.status = this.$store.getters.getOrderTab || "";
    this.activeIndex = this.$store.getters.getOrderTab || "0";
    this.layoutStatuBar(height);
    if (lang) {
      this.$i18n.locale = lang;
    }
    if (data.token) {
      this.token = data.token;
      this.orderQuery(this.status);
    }
    // this.orderQuery(this.status);
  },
  destroyed() {
    window.onscroll = null;
  },
  methods: {
    /** 安卓用户在使用实体返回键退出webview时 */
    jsGetWebViewOut() {
      this.$store.commit(UPDATE_TOKEN_ID, { token: "", deviceId: "" });
    },
    /** 发送信息到app关闭webview */
    closeWebView() {
      this.$store.commit(UPDATE_TOKEN_ID, { token: "", deviceId: "" });
      if (this.isAndroid()) {
        javascript: android.exitActivity();
      } else {
        this.postMessageToIOS({ isCloseWebView: true });
      }
    },
    /** 从IOS处获取设备ID和token */
    jsGetTokenAndDeviceID(data) {
      if (data) {
        this.token = data.token;
        this.$store.commit(UPDATE_TOKEN_ID, { token: data.token });
        this.$store.commit(UPDATE_BAR_HEIGHT, { statuBarHeight: data.height });

        this.layoutStatuBar(data.height);
        this.orderQuery(this.status);
      } else {
        this.toast(this.$t("CannotGetDevice"));
      }
    },

    /** 订单查询 */
    orderQuery(status) {
      let loading = this.vmLoadingFull();
        this.isGetData = true;
        const postData = {
          access_token: this.token,
          status: parseInt(status),
          time_start: "",
          time_end: "",
          page: this.page,
          page_size: 10,
          order_id: ""
        };
        this.$http.post(ORDER_QUERY_POST, postData).then(res => {
          let data = res.data;
          this.isTabCanClick = true;
          if (data.code_msg) {
            loading.close();
            this.isGetData = false;
            return this.toast(this.$t("GetOrderError"));
          }
          if (!data.body || !data.body.orderinfo) {
            this.isGetData = false;
            loading.close();
            return;
          }
          this.totalData = data.body.total;
          let deviceIdFuncs = [];
          data.body.orderinfo.forEach(o => {
            this.tempOrderList.push({
              orderId: o.order_desc,
              deviceName: "",
              createTime: this.dateFormat(o.create_time),
              orderStatus: this.$t(transformPayStatus(o.status)),
              orderStatusStyle: transformPayClass(o.status)
            });
            deviceIdFuncs.push(
              this.getDeviceInfo(o.item[0].item_relation, o.order_desc)
            );
          });
          Promise.all(deviceIdFuncs).then(result => {
            result.forEach(device => {
              let temp = this.tempOrderList.find(
                obj => obj.orderId === device.orderId
              );
              temp && (temp.deviceName = device.device.device_name || "-");
            });
            this.isGetData = false;
            loading.close();
            this.data = this.tempOrderList;
          });

          this.isTabCanClick = true;
        }).catch(e => {
          loading.close();
          this.toast(this.$t("appError") + "【orderQuery】: " + e);
        })
    },

    /** 获取设备 */
    getDeviceInfo(deviceId, orderId) {
      return new Promise((resolve, reject) => {
        const postData = {
          access_token: this.token,
          device_id: deviceId,
          sub_device_id: ""
        };
        this.$http.post(DEVICE_INFO_POST, postData).then(res => {
          if (res.data.code_msg) {
            return resolve();
          }
          resolve({ orderId: orderId, device: res.data.body });
        }).catch(e => {
          this.toast(this.$t("appError") + "【deviceinfo】: " + e);
          reject();
        })
      });
    },

    dateFormat(millseconds) {
      let date = new Date(millseconds);
      return dateFormat(date, "yyyy-MM-dd hh:mm:ss");
    },

    /** 进入订单详情 */
    routeJump(orderId, deviceName) {
      if (deviceName === "-") {
        return this.toast(this.$t("DeviceNotExist"));
      }
      this.$router.push("/order-to-pay/" + orderId + "/" + this.token);
    },

    /** tab切换 */
    handleSelect(index) {
      if (!this.isTabCanClick) {
        return;
      }
      this.tempOrderList = [];
      this.data = [];
      this.totalData = -1;
      this.page = 1;
      this.status = index == "0" ? "" : parseInt(index);
      this.$store.commit(ORDER_LIST_TAB, { orderListTab: this.status + "" });
      this.orderQuery(this.status);
    },

    /** 设置导航布局 */
    layoutStatuBar(height) {
      document.getElementsByClassName("statu-bar")[0].style.height =
        height + "px";

      let title = document.getElementById("title");
      title.style.paddingTop = height + "px";

      let ordertab = document.getElementById("ordertab");
      ordertab.style.paddingTop = title.getBoundingClientRect().height + "px";

      document.getElementById("orderlist").style.paddingTop =
        ordertab.getBoundingClientRect().height + "px";
    },

    //获取页面顶部被卷起来的高度
    scrollTop() {
      return Math.max(
        //chrome
        document.body.scrollTop,
        //firefox/IE
        document.documentElement.scrollTop
      );
    },

    //获取页面文档的总高度
    documentHeight() {
      //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },

    //获取页面浏览器视口的高度
    windowHeight() {
      //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
      return document.compatMode == "CSS1Compat"
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
    }
  }
};
</script>

<style scoped>
.nav-bar {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  width: 25%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.order-lists {
  background: #fff;
  color: #4a4a4a;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
.order-lists .module-container {
  border-bottom: 1px solid #e8e8e8;
  margin-left: 1.33rem;
  padding-left: 0;
  display: flex;
  align-items: center;
}

.order-lists .order-name {
  font-size: 18px;
  margin-top: 1rem;
  padding: 0 1.33rem;
}
.order-lists .order-params {
  font-size: 1.33rem;
  color: #9d9d9d;
  margin-top: 0.5rem;
  padding: 0 1.33rem;
}
.order-lists .order-params .right {
  text-align: right;
}
.order-lists .order-params .right.success {
  color: #0bc6bf;
}
.order-lists .order-params .right.wait {
  color: #fc7e7f;
}
.order-lists .order-params .right.cancel {
  color: #9d9d9d;
}
</style>