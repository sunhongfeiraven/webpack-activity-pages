export default function fixedHeader (isFixed) {
  var header = document.getElementById('header')
  var headerTitle = document.getElementById('headerTitle')
  var btnBackIcon = document.getElementById('btnBackIcon')
  var btnShareIcon = document.getElementById('btnShareIcon')

  function fixHeader() {
    header.style.background = '#fff'
    headerTitle.style.display = 'block'
    header.style.borderBottom = '1px solid #ccc'
    btnBackIcon.className = 'icon-back-black'
    btnShareIcon.className = 'icon-share-black'
  }

  function transparentHeader() {
    header.style.background = 'none'
    headerTitle.style.display = 'none'
    header.style.borderBottom = 'none'
    btnBackIcon.className = 'icon-back-white'
    btnShareIcon.className = 'icon-share-white'
  }

  if (isFixed) {
    fixHeader()
  } else {
    transparentHeader()

    // window.onscroll = function() {
    window.addEventListener('scroll', function() {
      var scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTopHeight >= 200) {
        fixHeader()
      } else {
        transparentHeader()
      }
    })
  }
}
