import axios from 'axios'
import wx from 'wx'
import bridge from './bridge'
import { isInJcy, browser } from './utils'

// title, subTitle, image, link -shareData
export default class Share {
  constructor({ showIcon = true, shareData }) {
    this.showIcon = showIcon
    this.shareData = shareData
    this.init()
  }

  // 显示分享按钮 微信分享
  init() {
    const self = this
    const main = document.getElementById('main')
    const btnShare = document.getElementById('btnShare')
    // const btnDownload = document.getElementById('btnDownload')
    const downloadWrap = document.getElementById('downloadWrap')

    if (isInJcy()) {
      if (this.showIcon) {
        btnShare.style.display = 'block'
        btnShare.addEventListener('click', function() {
          self.initJcyShare()
        })

        // 隐藏底部下载区域 padding
        main.style.marginBottom = '0'
      }
    } else {
      btnShare.style.display = 'none'
      // 显示底部下载区域 padding
      main.style.marginBottom = '1.6rem'
      // 下载按钮
      downloadWrap.style.display = 'block'
      // 微信分享
      self.initWxShare()
    }
  }

  // 下载由魔窗处理

  /*  handleDownLoadClick() {
    if (browser.versions.iphone) {
      location.href = 'https://itunes.apple.com/us/app/%E9%87%91%E8%AF%9A%E9%80%B8/id1210266059?mt=8'
    } else {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jcgroup.ease'
    }
  } */

  initJcyShare() {
    const { title, subTitle, image, link } = this.shareData
    bridge.call('base_share', { title, subTitle, image, link }, res => {})
  }

  initWxShare() {
    if (browser.versions.wx) {
      const { title, subTitle, image } = this.shareData
      let jsApiList = [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
      axios
        .get('https://www.jcease.com/api/wx/config')
        .then(res => {
          if (res && res.data && res.data.code === 0 && res.data.data) {
            let cfg = res.data.data
            wx.config({
              appId: 'wxb01ccdde86f4613e',
              timestamp: cfg.timestamp,
              nonceStr: cfg.nonceStr,
              signature: cfg.signature,
              jsApiList
            })
            wx.ready(function() {
              wx.onMenuShareAppMessage({ title, desc: subTitle, imgUrl: image })
              wx.onMenuShareTimeline({ title, desc: subTitle, imgUrl: image })
            })
            wx.error(function(res) {
              console.log(res)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
