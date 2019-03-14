<template>
  <div class="container">
    <div class="layout">
      <el-row id="title" class="fixed-layout" v-show="isAndroid()">
        <el-col :span="24">
          <div class="nav-bar">
            <!-- <i class="el-icon-arrow-left" @click="submitPayForm"></i> -->
            <div class="title">{{ $t('PayResultTitle') }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="success-icon">
          <img src="../assets/img/ic_paysuccess.png"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="success-tip">{{ $t(newuser) }}</el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="24" class="success-note">
          <p>{{ $t('PayResultTipDesc') }}</p>
        </el-col>
      </el-row>-->
      <div class="toolbar" @click="submitPayForm">{{ $t('ReturnToDevice') }}</div>
    </div>
  </div>
</template>

<script>
import { UPDATE_TOKEN_ID } from '@/store/mutations-type'
  export default {
    data () {
      return {
        isNewUser: false
      }
    },
    beforeCreate() {
      if (!this.isAndroid()) { 
        this.postMessageToIOS({ isShowWebView: true })
      }
    },
    mounted () {
      this.layoutStatuBar(this.$route.params.height)
      this.$i18n.locale = this.$route.params.lang
      this.isNewUser = this.$route.params.newuser
      if(!this.isAndroid()) {
        this.postMessageToIOS({ navTitle: this.$t("PayResultTitle") });
      }
    },
    computed: {
      newuser () {
        return parseInt(this.isNewUser) ? "GetSuccess" : "PayResultTip"
      }
    },
    methods: {
      /** 发送信息到app关闭webview */
      submitPayForm () {
        this.$store.commit(UPDATE_TOKEN_ID, { token: '', deviceId: '' })
        if (this.isAndroid()) {
          javascript:android.exitActivity()
        } else {
          this.postMessageToIOS({ isCloseWebView: true })
        }
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
  height: 100%;
  position: absolute;
  width: 100%;
}

.success-icon {
  padding: 8rem 0;
}
.success-tip {
  font-size: 1.6rem;
  padding-bottom: 2rem;
}
.success-note {
  color: #4a4a4a;
  font-size: 1.5rem;
}
.success-note p {
  margin: 0.2rem;
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