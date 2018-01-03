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

/* *
* 是否在金诚逸环境
* */
export const isInJcy = () => {
  if (browser.versions.isInJcy) {
    bridge.call('base_inClient', {}, res => {
      return res.data && 'clientFlag' in res.data && res.data.clientFlag === 'jcy'
    })
  } else {
    return false
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
