// 先引入样式
import './css/style.less'

// 引入依赖
import bridge from '@/bridge'
import Share from '@/share'
import { isInJcy, eventDelegate } from '@/utils'
import { basePrefix } from './js/config'

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

new Share({
  shareData: {
    title: '分享标题',
    subTitle: '分享文案',
    image: basePrefix + 'images/xxxx.jpg',
    link: basePrefix + 'index.html'
  }
})

function getSchemeUrl(type, prdId) {
  return 'jcgroup-jcy://jcy.jc/go?action=MarketProductDetail&prdId=' + prdId + '&url=http://www'
}

if (isInJcy()) {
  /* 在相应的 DOM 节点上打开 app 页面 */
  eventDelegate('.txt-detail', '.btn', 'onclick', function(el) {
    bridge.call('base_schemeUrl', {
      url: getSchemeUrl(el.dataset.type, el.dataset.id)
    })
  })
} else {
  const mlink = 'https://ahv8ke.mlinks.cc/Adbw'
  let mlinkOption = []
  document.querySelectorAll('.main .mlink').forEach(function(el) {
    if (el.dataset.type === 'product' || el.dataset.type === 'coupon' || el.dataset.type === 'jCoffee') {
      mlinkOption.push({
        mlink,
        button: el,
        params: {
          schemeurl: getSchemeUrl(el.dataset.type, el.dataset.id)
        }
      })
    }
  })

  console.log(mlinkOption)
  /*eslint-disable */
  new Mlink(mlinkOption)
}
