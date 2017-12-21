/***
 * 返回顶部
 */

var toTop = document.getElementById('toTop');
var header = document.getElementById('header');
var timer = null;
var isTop = true;
window.onscroll = function() {
  var scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTopHeight >= 200) {
    show.style.display = "none";
    if (isShare) {
      toTop.style.display = "block";
      title.style.display = "none";
    } else {
      toTop.style.display = "block";
      title.style.display = "flex";
    }
  } else {
    if (isShart) {
      toTop.style.display = "none";
      show.style.display = "none";
    } else {
      toTop.style.display = "none";
      title.style.display = "none";
      show.style.display = "flex";
    }
  };
  if (!isTop) {
    clearInterval(timer);
  };
  isTop = false;
};

toTop.onclick = function() {
  timer = setInterval(function(){
    var scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var ispeed = Math.floor(-scrollTopHeight / 10);
    document.documentElement.scrollTop = document.body.scrollTop = scrollTopHeight+ispeed;
    if (scrollTopHeight == 0) {
      clearInterval(timer);
    };
    isTop = true;
  },30);
};
