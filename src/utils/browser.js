const browser = {
  versions: (function() {
    const u = navigator.userAgent
    return {
      isInJcy: !!u.match(/jcy/),
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      wx: u.indexOf('MicroMessenger') !== -1
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export default browser
