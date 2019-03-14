const prefix = process.env.DEPLOY_ENV === 'dev' ? '' : ''; // 预留，以便在测试环境与正式环境接口不一致时方便打包

/** 设备信息接口 */
export const DEVICE_INFO_POST = prefix + '/v1/iotuserdevice/userdeviceinfoget';

/** 商品信息接口 */
export const GOOD_INFO_POST = prefix + '/v1/iotgoods/goodsquery';

/** 订单提交接口 */
export const ORDER_SUBMIT_POST = prefix + '/v1/iotorder/ordercreate';

/** 订单查询接口 */
export const ORDER_QUERY_POST = prefix + '/v1/iotorder/orderquery';

/** 服务过期时间查询接口 */
export const EXPIRE_SERVE_POST = prefix + '/v1/iotoss/usercsscfgget';

/** 获取设备图片接口 */
export const DEVICE_PIC_POST = prefix + '/v1/iotyos/getobject';

/** 订单取消接口 */
export const ORDER_CANCEL_POST = prefix + '/v1/iotorder/ordercancle';

/** 支付调起接口 */
export const PAYMENT_API_POST = prefix + '/v1/iotpay/payment';

/** 支付结果查询接口 */
export const PAYMENT_RESULT_POST = prefix + '/v1/iotpay/paycheck';

/** 商品类型查询接口 */
export const GOOD_CLASS_QUERY_POST = prefix + '/v1/iotgoods/goodsclasslist';
