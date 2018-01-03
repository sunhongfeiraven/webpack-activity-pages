/* eslint-disable */
const ua = {
    ios: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    android: /Android/i.test(navigator.userAgent)
  },
  callHandlers = [],
  registerHandlers = [],
  bridge = {
    call(...args) {
      callHandlers.push(args)
    },
    register(...args) {
      registerHandlers.push(args)
    }
  }

/**
 * 获取ios 的bridge object
 * https://github.com/marcuswestin/WebViewJavascriptBridge
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function setupIphoneWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }

  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)

  return false
}
/**
 * 获取android 的bridge object
 * https://github.com/lzyzsd/JsBridge
 * http://mp.weixin.qq.com/s?__biz=MzI1NjEwMTM4OA==&mid=2651231789&idx=1&sn=f11650ad0e18ddc12ece6e7559d5084c&scene=1&srcid=0513BWa7HuHjzPAeManB3w6C#rd
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function connectAndroidWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => {
        callback(WebViewJavascriptBridge)
      },
      false
    )
  }
}
/**
 * 根据环境暴露bridge object
 * @param  {[type]} bridgeObj [description]
 * @return {[type]}           [description]
 */
function exportBridge(bridgeObj) {
  bridgeObj.init && bridgeObj.init()
  if (bridgeObj) {
    bridge.call = bridgeObj.callHandler
    bridge.register = bridgeObj.registerHandler

    if (callHandlers.length) {
      callHandlers.forEach(call => {
        bridge.call(...call)
      })
    }
    if (registerHandlers.length) {
      registerHandlers.forEach(register => {
        bridge.register(...register)
      })
    }
  }
}

if (ua.ios) {
  setupIphoneWebViewJavascriptBridge(exportBridge)
} else if (ua.android) {
  // require('dir-util/AndroidWebViewJavascriptBridge.js')
  connectAndroidWebViewJavascriptBridge(exportBridge)
}

export default bridge

// bridge.call  调用native提供的方法
// - bridge.call('immediateExperience') 引导页，立即体验按钮
// - bridge.call('setTitle', title) header 设置title
