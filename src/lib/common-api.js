/**
 * 说明：
 * 该库采用VUE插件开发方式开发
 * 该库为全局函数库，在该库定义的函数将在项目vue组件中可以直接调用而不用反复导入
 * 其他开发人员在扩展该库时注意不要将少数地方用到的函数封装到该库，避免不必要的额外资源占用
 */

exports.install = function (Vue, options) {
  const vm = new Vue()

  /**
   * 操作等待函数，全屏loading
   * @param { msg } 文字提示
   */
  Vue.prototype.vmLoadingFull = function (msg = '') {
    return vm.$loading({
      lock: true,
      text: msg,
      background: 'transparent'
    })
  },

  /**
   * 判断是否是安卓
   */
  Vue.prototype.isAndroid = function () {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    return isAndroid
  }

  /**
   * 判断是否是IOS
   */
  Vue.prototype.isIOS = function () {
    let u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isiOS
  }

   /** 传递数据到IOS的方法 */
  Vue.prototype.postMessageToIOS = function (data) { 
    try {
      window.webkit.messageHandlers.getMessage.postMessage(data)
    } catch (error) {
        
    }
  }

  /** 调用app toast */
  Vue.prototype.toast = function (data) {
    if (vm.isAndroid()) { 
      javascript:android.showNotifyDialog(data) 
    } else { 
      vm.postMessageToIOS({ isNotify: true, msg: data }) }
  }
}
