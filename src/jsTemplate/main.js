// 先引入样式
import './style/style.less'

// 引入依赖
import bridge from '@/bridge'
import Share from '@/share'
import { isInJcy, eventDelegate, getBasePrefix, getSchemeUrl, initMlink } from '@/utils'
// js中引入的图片不能打包进去，要先用 import 引入
// import './images/share.jpg'

const basePrefix = getBasePrefix('jsTemplate') // 文件夹名

/*
  // 需要请求后台时的接口
  import { getBaseUrl } from '@/utils'
  const baseUrl = getBaseUrl('XXXX')
 */

/*
// 视频
import plyr from 'plyr'
// ！video标签上的poster 无法被webpack识别 需要单独import
import './images/v1.jpg'
plyr.setup(document.getElementById('myVideo'), {
  debug: true,
  fullscreen: {
    enabled: false,
    allowAudio: false,
    fallback: false
  },
  enabled: /Android|webOS|BlackBerry/i.test(navigator.userAgent)
})
*/

/*
import Swiper from 'swiper'
// Swiper
new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  autoplay: 2000,
  // 如果需要分页器
  pagination: '.swiper-pagination',
})
*/

// 分享文案 & 图片
new Share({
  shareData: {
    title: '分享标题',
    subTitle: '分享文案',
    image: basePrefix + 'images/share.jpg',
    link: basePrefix + 'index.html'
  }
})

// 判断是否在金诚逸中
isInJcy(res => {
  if (res) {
    /* 在相应的 DOM 节点上打开 app 页面 */
    eventDelegate('.main', '.mlink', 'onclick', function(el) {
      bridge.call('base_schemeUrl', {
        url: getSchemeUrl(el.dataset.type, el.dataset.id)
      })
    })
  } else {
    // 魔窗
    const schemeurl = `jcgroup-jcy://jcy.jc/go?action=JCInnerWebView&url=${basePrefix}`
    initMlink(schemeurl)
  }
})
