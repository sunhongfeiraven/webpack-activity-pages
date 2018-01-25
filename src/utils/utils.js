/* eslint-disable */
import bridge from './bridge'

/**
 *  判断浏览器类型
 */
export const browser = {
  versions: (function() {
    const ua = navigator.userAgent
    return {
      isInJcy: !!ua.match(/jcy/),
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/),
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
      iphone: ua.indexOf('iPhone') > -1,
      wx: ua.indexOf('MicroMessenger') !== -1
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/**
 * 是否在金诚逸环境
 * */

export const isInJcy = function(cb) {
  if (browser.versions.isInJcy) {
    bridge.call('base_inClient', {}, res => {
      if (res.data && 'clientFlag' in res.data && res.data.clientFlag === 'jcy') {
        cb && cb(true)
      } else {
        cb && cb(false)
      }
    })
  } else {
    cb && cb(false)
  }
}

/**
 * 获取金诚逸用户id
 * */
export const getJcyUserId = function(cb) {
  bridge.call('base_userData', {}, userData => {
    if (userData && userData.data && userData.data.userId !== '') {
      cb && cb(userData.data.userId)
    } else {
      cb && cb(false)
    }
  })
}

/**
 * 构造分享内容中图片和链接的地址
 * @param folderName
 * @returns {*}
 * */
export const getBasePrefix = folderName => {
  let url = `http://test.jcywap.easybao.com/activities/${folderName}/` // 测试
  if (env === 'PRE') {
    url = `http://pre.jcywap.easybao.com/activities/${folderName}/` // 预发
  } else if (env === 'PROD') {
    url = `https://jcywap.easybao.com/activities/${folderName}/` // 生产
  }
  return url
}

/**
 * 需要请求后台时的接口
 * @param params
 * @returns {*}
 */
export const getBaseUrl = params => {
  let url = `http://test.jcyapi.easybao.com/${params}` // 测试
  if (env === 'PRE') {
    url = `http://pre.jcyapi.easybao.com/${params}` // 预发
  } else if (env === 'PROD') {
    url = `https://jcyapi.easybao.com/${params}` // 生产
  }
  return url
}

/***
 * 链接跳转地址
 * @param type
 * @param id (商品id || 店铺id)
 * @returns {*}
 */
export function getSchemeUrl(type, id) {
  if (type === 'product') {
    return `jcgroup-jcy://jcy.jc/go?action=MarketProductDetail&prdId=${id}&url=http://www`
  } else if (type === 'coupon') {
    return `jcgroup-jcy://jcy.jc/go?action=JCCouponDetail&prdId=${id}`
  } else if (type === 'jCoffee') {
    return 'jcgroup-jcy://jcy.jc/go?action=JCTakeOutShop&shopId=1'
  } else if (type === 'marketShop') {
    return `jcgroup-jcy://jcy.jc/go?action=JCY_Market_Shop&shopId=${id}`
  } else if (type === 'couponShop') {
    return `jcgroup-jcy://jcy.jc/go?action=JCCouponShop&shopId=${id}`
  }
}

/***
 * 解析地址栏 params
 * @param name
 * @returns {value}
 */
export const getUrlParam = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) return unescape(r[2])
  return null // 返回参数值
}

/***
 * 事件代理方法
 * @param parentSelector
 * @param targetSelector
 * @param events
 * @param callback
 */
export function eventDelegate(parentSelector, targetSelector, events, callback) {
  // 触发执行的函数
  function triFunction(e) {
    // 兼容性处理
    var event = e || window.event

    // 获取到目标阶段指向的元素
    var target = event.target || event.srcElement

    // 获取到代理事件的函数
    var currentTarget = event.currentTarget

    // 处理 matches 的兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s)
          var i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1
        }
    }
    // 遍历外层并且匹配
    while (target !== currentTarget) {
      // 判断是否匹配到我们所需要的元素上
      if (target.matches(targetSelector)) {
        var sTarget = target
        // 执行绑定的函数，注意 this
        // callback.call(sTarget, Array.prototype.slice.call(arguments))
        callback(sTarget)
      }

      target = target.parentNode
    }
  }

  // 如果有多个事件的话需要全部一一绑定事件
  events.split('.').forEach(function(evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function($p) {
      // $p.addEventListener(evt, triFunction);
      $p[evt] = triFunction
    })
  })
}

/**
 * 添加魔窗
 * @param {} schemeurl
 */
export function initMlink(schemeurl) {
  const mlink = 'https://ahv8ke.mlinks.cc/Adbw'
  let mlinkOption = [{ mlink, button: document.getElementById('btnDownload'), params: { schemeurl } }]
  document.querySelectorAll('.main .mlink').forEach(function(el) {
    mlinkOption.push({
      mlink,
      button: el,
      params: { schemeurl }
    })
  })
  /* eslint-disable no-undef */
  new Mlink(mlinkOption)
}
