<template>
  <div class="container">
    <el-row id="title" class="fixed-layout" style="background: #fff;" v-show="isAndroid()">
      <el-col :span="24">
        <div class="nav-bar">
          <i class="el-icon-arrow-left" @click="closeWebView"></i>
          <div class="title">{{ $t("OrderCloudStorageTitle") }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :style="isAndroid() ? {paddingTop: '30px'} : {paddingTop: '0px'}">
      <el-col :span="24">
        <div class="banner">
          <i
            class="banner-icon"
            :style="lang === 'pt' ? {marginTop: '2.48rem'} : {marginTop: '6.38rem'}"
          ></i>
          <p class="banner-desc pd-13">{{ $t("CloudStorageDesc") }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt-20 module-container">
      <el-col :span="12" class="left-label">{{ $t("OpeningDevice") }}</el-col>
      <el-col :span="12" class="right-value">{{deviceInfo.device_name}}</el-col>
    </el-row>

    <el-row class="module-container mt-20">
      <el-col :span="24">
        <p class="left-label mt-0">{{ $t("RecordWay") }}</p>
        <el-row style="margin-top: 1rem;white-space: nowrap;overflow-x: scroll;">
          <el-col
            class="align-center slot-record"
            v-for="(item, index) in recordTheWayComputed"
            :key="index"
            :class="isSelectedRecord === item.name ? 'selected' : ''"
          >
            <div @click="selectRecordWay(item.name)">
              <h3 class="title">{{item.title}}{{ $t("Hours") }}</h3>
              <p style="margin-bottom: 1rem">{{ item.desc }}</p>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="module-container mt-20">
      <el-col :span="24">
        <p class="left-label mt-0">{{ $t("OpenTimes") }}</p>
        <div class="list">
          <ul>
            <li
              v-for="(item, index) in openTimeData"
              :key="index"
              :class="isSelectedTime === (item.time + '-' + item.promotionCode) ? 'selected' : ''"
              @click="selectRecordTime(item.time, item.isPromotion ? item.promotionPrice : item.price, item.isNewUser, item.promotionCode)"
            >
              <div class="item-content">
                <div class="item-title">
                  <span v-if="item.isNewUser" class="promotion">【{{$t("NewUserOwner")}}】</span>
                  <span v-if="item.isPromotion" class="promotion">【{{$t("LimitTime")}}】</span>
                  <span v-if="item.isPromotion">
                    {{item.promotionPriceFormat}}/{{item.name}}({{$t("OriginalPrice")}}
                    <span
                      style="text-decoration: line-through;"
                    >{{item.price / 100}}</span>)
                  </span>
                  <span v-else>
                    {{item.priceFormat}}/{{item.name}}
                    <span
                      v-if="item.time >= 360"
                    >({{item.perMonth}}/{{$t("Month")}})</span>
                  </span>
                </div>
                <!-- <div class="item-after"></div> -->
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <!-- <el-row>
      <el-col style="overflow:auto">{{token}}</el-col>
    </el-row> -->
    <el-row class="module-container protocol">
      <el-col :span="24">
        <el-checkbox v-model="protocolChecked" style="color: #969696;">
          {{ $t("ReadAndAgree") }}
          <a
            @click="toProtocol"
            style="text-decoration: underline;color: #606266"
          >《 {{ $t("ProtocolStorage") }} 》</a>
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row class="fixed-button">
      <el-col :span="14" class="account">{{ amount }}</el-col>
      <el-col :span="10" :class="isBtnDisabled ? 'disabled' : 'available'">
        <div @click="submitOrdersForm">{{ $t(isNewUserSelect ? "GetIt" : "SubmitOrder") }}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { openTimeType } from "@/lib/const";
import {
  UPDATE_TOKEN_ID,
  UPDATE_BAR_HEIGHT,
  LANGUAGE,
  UPDATE_ORDER_ID
} from "@/store/mutations-type";
import { transformTime, formatMoney, getQueryString } from "@/lib/lib";
import { DEVICE_INFO_POST, GOOD_INFO_POST, ORDER_SUBMIT_POST } from "@/lib/api";

export default {
  data() {
    return {
      isSelectedRecord: "",
      isSelectedTime: "",
      protocolChecked: false,
      token: "",
      deviceId: "", // IOTSHMK000S00004FE594F6
      deviceInfo: {}, // 设备信息
      recordTheWay: [], // 录制方式数据
      openTimeData: [], // 开通时长数据
      times: [], // 时长集合
      goods: [], // 商品集合
      currency: 0, // 待支付金额
      unit: "", // 货币代码
      loading: null,
      lang: "en",
      isNewUserSelect: false
    };
  },
  created() {
    this.loading = this.vmLoadingFull();

    // app端载入时存在lang参数，前端路由跳转无lang参数，避免前端路由返回时无lang参数报错
    if (!this.$store.getters.getLanguage) {
      const lang = getQueryString("lang");
      if (!lang) return;

      this.lang = lang;
      this.$i18n.locale = lang;
      this.$store.commit(LANGUAGE, { lang: lang });
    }
    // IOS端导航设置-- IOS端使用app导航，安卓端使用H5导航，后期需要统一
    if(!this.isAndroid()) {
      this.postMessageToIOS({ navTitle: this.$t("OrderCloudStorageTitle") });
    }
  },
  mounted() {
    // 挂载到全局，app端调用才不会报错
    window.jsGetTokenAndDeviceID = this.jsGetTokenAndDeviceID;
    window.jsGetWebViewOut = this.jsGetWebViewOut;

    // 如果用户回退页面或其他方式并未从app直接进入该页面，则从store中获取token和deviceId
    let data = this.$store.getters.getTokenAndDeviceId;
    let height = this.$store.getters.getBarHeight;
    this.lang = this.$store.getters.getLanguage;
    this.layoutStatuBar(height);
    if (this.lang) {
      this.$i18n.locale = this.lang;
    }
    if (data.token && data.deviceId) {
      this.token = data.token;
      this.deviceId = data.deviceId;
      Promise.all([this.getGoodsInfo(), this.getDeviceInfo()]).then(e => {
        this.loading.close();
      });
    }
    // TODO: 测试，待注释
    // Promise.all([this.getGoodsInfo(), this.getDeviceInfo()]).then(e => {
    //   this.loading.close();
    // });
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

    /** 从IOS和安卓处获取设备ID和token */
    jsGetTokenAndDeviceID(data) {
      if (data) {
        this.deviceId = data.deviceID;
        this.token = data.token;
        Promise.all([this.getGoodsInfo(), this.getDeviceInfo()]).then(e => {
          this.loading.close();
        });
        this.layoutStatuBar(data.height);
        this.$store.commit(UPDATE_TOKEN_ID, {
          token: data.token,
          deviceId: data.deviceID
        });
        this.$store.commit(UPDATE_BAR_HEIGHT, { statuBarHeight: data.height });
      } else {
        this.toast(this.$t("CannotGetDevice"));
      }
    },

    selectRecordWay(way) {
      this.openTimeFormat(way);
      this.isSelectedRecord = way;
    },
    selectRecordTime(time, price, isNewUser, promotionCode) {
      this.currency = price;
      this.isSelectedTime = `${time}-${promotionCode}`;
      isNewUser
        ? (this.isNewUserSelect = true)
        : (this.isNewUserSelect = false);
    },

    /** 格式化开通时长渲染数据 */
    openTimeFormat(recordWay) {
      this.openTimeData = [];
      let goods = this.goods.filter(
        o => o.goods_name + o.class_name === recordWay
      );
      if (!goods.length) {
        return;
      }
      this.unit = goods[0].unit;

      // 检测选中的商品类型是否存在新用户专享
      let onlyNewUser = this.goods.find(
        o => o.is_promotion === 3 && o.class_name === goods[0].class_name
      );
      if (onlyNewUser) {
        this.openTimeData.push({
          name: `${this.$t(transformTime(onlyNewUser.goods_lasteddate))}`,
          time: onlyNewUser.goods_lasteddate,
          perMonth: formatMoney(
            onlyNewUser.pro_price / (onlyNewUser.goods_lasteddate / 30),
            onlyNewUser.unit
          ),
          price: onlyNewUser.price, // good.price, // 不带货币符号的原价格
          priceFormat: formatMoney(onlyNewUser.price, onlyNewUser.unit), // 带货币符号的原价格
          isNewUser: true, // 是否新用户专享
          promotionCode: 3,
          promotionPrice: onlyNewUser.pro_price, //不带货币符号的促销价格
          promotionPriceFormat: formatMoney(
            onlyNewUser.pro_price,
            onlyNewUser.pro_unit
          ), // 带货币符号的促销价格
          promotionId: onlyNewUser.pro_id // 促销ID
        });
      }

      goods.forEach(o => {
        this.openTimeData.push({
          name: `${this.$t(transformTime(o.goods_lasteddate))}`,
          time: o.goods_lasteddate,
          perMonth: formatMoney(o.price / (o.goods_lasteddate / 30), o.unit),
          price: o.price, // good.price, // 不带货币符号的原价格
          priceFormat: formatMoney(o.price, o.unit), // 带货币符号的原价格
          isPromotion: o.is_promotion === 2, // 是否促销
          promotionCode: o.is_promotion,
          promotionPrice: o.pro_price, //不带货币符号的促销价格
          promotionPriceFormat: formatMoney(o.pro_price, o.pro_unit), // 带货币符号的促销价格
          promotionId: o.pro_id // 促销ID
        });
      });
      // 将促销的商品排在前面渲染
      let tempPromotions = this.openTimeData.filter(o => o.promotionCode != 1);
      let tempNormals = this.openTimeData.filter(o => o.promotionCode === 1);
      this.openTimeData = tempPromotions
        .sort((a, b) => b.isPromotion - a.isPromotion)
        .concat(tempNormals.sort((a, b) => a.time - b.time));
      if (this.openTimeData.length > 0) {
        // 设置默认选中
        let temp = this.openTimeData[0];
        this.selectRecordTime(
          temp.time,
          temp.isPromotion ? temp.promotionPrice : temp.price,
          null,
          temp.promotionCode
        );
        temp.isNewUser && (this.isNewUserSelect = true);
      }
    },

    /** 根据设备ID获取设备信息 */
    getDeviceInfo() {
      return new Promise((resolve, reject) => {
        const postData = {
          access_token: this.token,
          device_id: this.deviceId,
          sub_device_id: ""
        };
        this.$http
          .post(DEVICE_INFO_POST, postData)
          .then(res => {
            if (res.data.code_msg) {
              this.toast(this.$t("GetDeviceError"));
              return resolve();
            }
            this.deviceInfo = res.data.body;
            resolve();
          })
          .catch(e => {
            reject();
          });
      });
    },

    /** 获取服务信息 （开通时长、录制方式）*/
    getGoodsInfo() {
      return new Promise((resolve, reject) => {
        const postData = {
          access_token: this.token,
          device_id: this.deviceId,
          page: 1,
          page_size: "",
          is_onsale: 1, //商品是否可售，1不可售卖2可售
          class_id: "", // 云存储类别 阿里云、亚马逊等 3种
          goods_id: "" //有值查询具体，没有则返回满足其他条件的所有
        };

        this.$http
          .post(GOOD_INFO_POST, postData)
          .then(res => {
            if (res.data.code === 60012) {
              alert(this.$t("NotSupportYun"));
              return resolve();
            }
            if (res.data.code_msg) {
              this.toast(this.$t("GetGoodError"));
              return resolve();
            }
            let goods = res.data.body.goodsInfo;

            if (!goods) {
              this.toast(this.$t("NoData"));
              return resolve();
            }
            this.goods = goods || [];

            let recordWay = goods.map(o => {
              return {
                name: o.goods_name + o.class_name,
                title: o.goods_name,
                desc: o.goods_desc,
                is_promotion: o.is_promotion
              };
            });

            recordWay.forEach(o => {
              let exist = this.recordTheWay.find(n => n.name === o.name);
              if (!exist && o.is_promotion !== 3) this.recordTheWay.push(o);
            });
            if (recordWay.length <= 0) {
              return resolve();
            }
            this.openTimeFormat(this.recordTheWay[0].name);
            resolve();
          })
          .catch(e => {
            this.toast(this.$t("appError") + "[getGoodsInfo]: " + e);
            reject();
          });
      });
    },

    /** 提交订单 */
    submitOrdersForm() {
      if (!this.protocolChecked) {
        return this.toast(this.$t("SelectdProtocol"));
      }
      if (!this.isSelectedTime) {
        return this.toast(this.$t("SelectedOpenTime"));
      }
      let good = null;
      if (this.isNewUserSelect) {
        good = this.goods.find(
          o =>
            this.isSelectedRecord.indexOf(o.class_name) &&
            o.is_promotion === 3
        );
      } else {
        good = this.goods
          .filter(o => o.goods_name + o.class_name === this.isSelectedRecord)
          .find(
            o =>
              o.goods_lasteddate ===
              parseInt(this.isSelectedTime.split("-")[0])
          );
      }
      if (!good) {
        return this.toast(this.$t("NoRelationData"));
      }
      let loading = this.vmLoadingFull();
      const postData = {
        access_token: this.token,
        item: [
          {
            item_pro_id: good.pro_id, // 促销ID
            item_id: good.goods_id, //商品id
            item_name: good.goods_name, //商品名称
            item_class: good.class_name, //商品类型
            number: 1, //数量
            price: this.currency, //单价
            unit: good.unit, //RMB,$
            item_relation: this.deviceId, //商品关联设备，可以是一个json字符串，{}
            picture_path: good.goods_picture //商品
          }
        ]
      };
      this.$http.post(ORDER_SUBMIT_POST, postData).then(res => {
        loading.close();
        let data = res.data;
        if (data.code_msg || !data.body) {
          return this.toast(this.$t("SubmitOrderError"));
        }
        if (this.isNewUserSelect) {
          this.$router.push(
            `/pay-result/${this.$store.getters.getLanguage}/${
              this.$store.getters.getBarHeight
            }/${1}`
          );
        } else {
          this.$router.push(
            `/orders-form/${res.data.body.order_id}/${this.token}`
          );
        }
      }).catch(e => {
        this.toast(this.$t("appError") + "[submitOrdersForm]: " + e);
      })
    },

    /** 设置导航布局 */
    layoutStatuBar(height) {
      document.getElementsByClassName("statu-bar")[0].style.height =
        height + "px";

      let title = document.getElementById("title");
      title.style.paddingTop = height + "px";
    },

    toProtocol() {
      let lang = this.$store.getters.getLanguage;
      if (lang === "zh") {
        this.$router.push("/protocol-cn");
      } else {
        this.$router.push("/protocol-en");
      }
    }
  },
  computed: {
    recordTheWayComputed() {
      let arr = this.recordTheWay;
      this.isSelectedRecord = arr.length > 0 ? arr[0].name : "";
      return this.recordTheWay;
    },
    amount() {
      return formatMoney(this.currency, this.unit);
    },
    isBtnDisabled() {
      return (
        !this.isSelectedRecord || !this.isSelectedTime || !this.protocolChecked
      );
    }
  }
};
</script>

<style scoped>
.pd-13 {
  padding: 0 1.33rem;
}
.align-center {
  text-align: center;
}
.mt-0 {
  margin-top: 0;
}
.nav-bar {
  height: 3.67rem;
  color: #4a4a4a;
  background: transparent;
  border-bottom: none;
}
.nav-bar i {
  top: 1rem;
}
.nav-bar .title {
  color: #4a4a4a;
  width: 100%;
}
.title {
  font-weight: bold;
  color: #4a4a4a;
}
.banner {
  height: 18.5rem;
  background: url("../assets/img/bg.png") no-repeat;
  background-size: cover;
}
.banner .banner-icon {
  display: inline-block;
  width: 3.75rem;
  height: 3.75rem;
  background: url("../assets/img/icon_cloud.png") no-repeat;
  /* margin-top: 2.38rem; */
  margin-left: 1.33rem;
}
.banner .banner-desc {
  color: #fff;
  line-height: 1.6;
  font-size: 1.24rem;
  word-break: break-all;
}
.right-desc {
  color: #4a4a4a;
}

.mt-20 {
  margin-top: 1.67rem;
}

.slot-record {
  border: 2px solid transparent;
  color: #cccccc;
  width: 12rem;
  display: inline-block;
  float: none;
  background: #f3f5f9;
  margin-left: 1rem;
}
.slot-record .title {
  font-weight: normal;
}

.selected {
  border: 1px solid #d9aa76 !important;
  border-radius: 5px;
  background-color: #fcf8f4 !important;
}
.selected .title {
  color: #daaa76;
}
.selected p {
  color: #999999;
}

.list ul:after,
.list ul:before {
  background-color: transparent;
}
.list {
  margin-top: 1rem;
}
.list ul li:first-child {
  border-top: 1px solid transparent;
}

.list ul li {
  border: 1px solid transparent;
  line-height: 3rem;
  font-size: 1.24rem;
  display: inline-block;
  background-color: #f3f5f9;
  margin-top: 1.5rem;
  border-radius: 5px;
  margin-right: 1.4rem;
}
.list ul li.selected + li {
  border-top: 1px solid transparent;
}
.list ul li .item-content {
  padding: 0 1rem;
}
.list ul li .item-title {
  color: #666666;
  display: inline-block;
  vertical-align: middle;
}

.list ul li .promotion {
  color: #f75f53;
}

.list ul li .new-user {
  color: #daaa76;
  font-size: 1.24rem;
  padding-right: 2rem;
  float: right;
  display: inline-block;
  vertical-align: middle;
}
.protocol {
  background: transparent;
  padding-bottom: 8rem;
}

.el-checkbox /deep/ .el-checkbox__label {
  white-space: normal;
}
.el-checkbox /deep/ .el-checkbox__input {
  vertical-align: top;
  /* margin-top: 3px; */
}

.el-checkbox /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #daaa76;
  border-color: #daaa76;
}
.el-checkbox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #4a4a4a;
}

.fixed-button {
  background: none;
}
.fixed-button .account {
  color: #f75f53;
  text-align: left;
  text-indent: 2rem;
  background-color: #fff;
}
.fixed-button .available {
  background: #e6c29e;
}
</style>
