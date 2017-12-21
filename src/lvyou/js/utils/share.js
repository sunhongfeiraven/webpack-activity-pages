
import fixedHeader from './fixedHeader'
import browser from './browser'

function Share(){}

// 构造分享内容中图片和链接的地址
var basePrefix = 'http://test.jcywap.easybao.com/activities/lvyou/' // 测试
if (env === 'PRE') {
  basePrefix = 'http://pre.jcywap.easybao.com/activities/lvyou/' // 预发
} else if (env === 'PROD') {
  basePrefix = 'https://jcywap.easybao.com/activities/lvyou/' // 生产
}

/**
 * 获取分享文案【标题、描述、图片、链接】
 * @param obj
 * @param name
 * @returns {*}
 */
Share.prototype.doPageShare = function() {
  this._bridge && this._bridge.call('base_share', {
    title: '逸旅游',
    subTitle: '逸旅游 —— 即刻开启筑梦之旅！',
    image: basePrefix + 'images/small.jpg',
    link: basePrefix + 'index.html'
  }, function (res) {});
}

/***
 * download
 */
Share.prototype.handleDownLoadClick = function() {
  location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jcgroup.ease';
}


/***
 *  获取初始Params
 */
Share.prototype.initParams = function(){
  var me = this
  const main = document.getElementById('main')

  if (browser.versions.isInJcy) {
    me._bridge && me._bridge.call('base_inClient', {}, (res) => { // 金诚逸内部打开
      if (res.data && 'clientFlag' in res.data && res.data.clientFlag === 'jcy') {
        // 分享按钮
        document.getElementById('btnShare').style.display = 'block'
        document.getElementById('btnShare').addEventListener('click', function () {
          me._bridge && me.doPageShare()
        });

        // 隐藏底部下载区域 padding
        main.style.paddingBottom = '0'
      }
    })
  } else { // 不在金诚逸内部打开
    // 显示底部下载区域 padding
    main.style.paddingBottom = '1.6rem'

    // 下载按钮
    document.getElementById('downloadWrap').style.display = 'block'
    document.getElementById('btnDownload').addEventListener('click', function () {
      me.handleDownLoadClick()
    })
  }
}

/***
 *  获取初始Params
 */
Share.prototype.init = function(_bridge) {
  this._bridge = _bridge
  this.initParams()
}

Share.prototype.initUserData = function(_userData){
  this._userData = _userData
}

export default Share
