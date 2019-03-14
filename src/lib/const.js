/**
 * 订单状态
 */
export const orderStatus = {
  // 已支付成功
  SUCCESS: 1,
  // 支付失败或未支付
  WAITING: 2,
  // 已取消
  CANCELLED: 3,
  // 已删除
  DELETED: 4
}

/**
 *  数字表示月
 */
export const openTimeType = {
  // 月
  month: '1',
  // 季度
  quarter: '3',
  // 半年
  half: '6',
  // 年
  year: '12'
}

/**
 * 支付接口
 */
export const payAPI = {
  // 支付宝
  alipay: 'https://openapi.alipay.com/gateway.do?',
  // 微信
  wechat: '',
  // paypal-国外的一个第三方支付
  paypal: ''
}

/** 支付类型 */
export const paymentType = {
  // 支付宝
  alipay: 1,
  // 微信
  wechat: 2,
  // paypal
  paypal: 3
}

/** 支付方式 */
export const paymentWay = {
  // H5支付
  H5: 3,
  // app支付
  app: 2
}

/**
 * 服务类型
 */
export const serviceType = {
  // 云存储服务
  cloudStorage: 10000
}

/** 
 * 货币单位转换成货币符号
 */
export const currencySwitch = {
  CNY: '￥',
  USD: '$',
  HKD: 'HK$'
}