
var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      isInJcy: !!u.match(/jcy/),
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export default browser
