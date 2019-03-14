import {orderStatus, paymentType} from '@/lib/const';
import {currencySwitch} from './const';

// export function isIOS () {
//   let u = navigator.userAgent;
//   let isiOS = !!u.match (/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//   return isiOS;
// }

// export function isAndroid () {
//   let u = navigator.userAgent;
//   let isAndroid = u.indexOf ('Android') > -1 || u.indexOf ('Adr') > -1;
//   return isAndroid;
// }

/**
 * 
 * @param {} strNumber 天数
 */
export function transformTime (strNumber) {
  let month = {
    7: 'SevenDays',
    15: 'FifteenDays',
    30: 'OneMonth',
    180: 'SixMonth',
    360: 'TwelveMonth',
  };
  return month[strNumber];
}

/** 规格数据处理, 将数据处理成需要的规格数据
 * data: 7*24*1 类型数据
 * type: 1 表示返回7*24，2 表示根据 data中的1 返回对应的描述
 */
export function transformStandard (data, type) {
  let arr = data.split ('*');
  if (type === 1) {
    return arr[0] + '*' + arr[1];
  }
  if (type === 2) {
    return transformTime (arr[2]);
  }
  return '';
}

/** 支付状态转换 */
export function transformPayStatus (status) {
  return status === orderStatus.SUCCESS
    ? 'PaySuccess'
    : status === orderStatus.WAITING
        ? 'WaitingToPay'
        : status === orderStatus.CANCELLED
            ? 'Canceled'
            : status === orderStatus.DELETED ? 'Deleted' : 'Unknown';
}

/** 支付状态转换，不同的支付状态为不同的颜色 */
export function transformPayClass (status) {
  return status === orderStatus.SUCCESS
    ? 'success'
    : status === orderStatus.WAITING
        ? 'wait'
        : status === orderStatus.CANCELLED ? 'cancel' : '';
}

/** 支付方式转换，根据支付方式标识码显示相应文字 */
export function transformPayType (status) {
  return status === paymentType.alipay
    ? 'PayWithAliPay'
    : status === paymentType.wechat
        ? 'PayWithWechat'
        : status === paymentType.paypal ? 'PayWithPayPal' : 'Unknown';
}

/** 
 * 将日期时间转换成指定格式 
 * 调用：dateFormat("yyyy-MM-dd hh:mm:ss")
 */
export function dateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth () + 1, //月份
    'd+': date.getDate (), //日
    'h+': date.getHours (), //小时
    'm+': date.getMinutes (), //分
    's+': date.getSeconds (), //秒
    'q+': Math.floor ((date.getMonth () + 3) / 3), //季度
    S: date.getMilliseconds (), //毫秒
  };
  if (/(y+)/.test (fmt)) {
    fmt = fmt.replace (
      RegExp.$1,
      (date.getFullYear () + '').substr (4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp ('(' + k + ')').test (fmt)) {
      fmt = fmt.replace (
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr (('' + o[k]).length)
      );
    }
  }
  return fmt;
}

/** 价格转换，分转换为元 */
export function formatMoney (price, unit) {
  let currency = currencySwitch[unit];
  return `${currency} ${(price / 100).toFixed (2)}`;
}

export function getQueryString (name) {
  var location = window.location.href.replace (/\#\//g, ''); // 替换掉# 号

  var r = location.split ('?');

  if (!r[1]) return null;
  var arr = r[1].split ('&');

  var paramsArr = [];
  arr.forEach (o => {
    var a = o.split ('=');
    paramsArr.push ({
      name: a[0],
      value: a[1],
    });
  });
  var val = paramsArr.find (o => o.name === name);
  if (val != null) {
    return unescape (val.value);
  }
  return null;
}
